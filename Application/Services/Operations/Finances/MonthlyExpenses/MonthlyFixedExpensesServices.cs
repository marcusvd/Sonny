using System.Threading.Tasks;
using AutoMapper;
using UnitOfWork.Persistence.Operations;
using System.Collections.Generic;
using System;
using Application.Exceptions;
using Microsoft.EntityFrameworkCore;
using Pagination.Models;
using System.Linq;
using System.Net;

using Application.Services.Operations.Finances.Dtos.CategorySubcategoryExpenses;
using Domain.Entities.Finances.CategorySubcategoryExpenses;
using Domain.Entities.Finances.MonthlyExpenses;
using Application.Services.Operations.Finances.Dtos.MonthlyExpenses;
using Application.Services.Operations.Finances.CommonForServices;
using Application.Services.Operations.Finances.Dtos;

namespace Application.Services.Operations.Finances.MonthlyExpenses
{
    public class MonthlyFixedExpensesServices : InheritanceForFinancialServices, IMonthlyFixedExpensesServices
    {
        private readonly IFinancialObjectMapperServices _IObjectMapperServices;
        private readonly IUnitOfWork _GENERIC_REPO;
        private readonly ICommonForFinancialServices _ICOMMONFORFINANCIALSERVICES;
        public MonthlyFixedExpensesServices(
            IUnitOfWork GENERIC_REPO,
           IFinancialObjectMapperServices IObjectMapperServices,
            ICommonForFinancialServices ICOMMONFORFINANCIALSERVICES
            )
        {
            _GENERIC_REPO = GENERIC_REPO;
            _IObjectMapperServices = IObjectMapperServices;
            _ICOMMONFORFINANCIALSERVICES = ICOMMONFORFINANCIALSERVICES;
        }
        public async Task<HttpStatusCode> AddRangeAsync(MonthlyFixedExpenseDto entityDto)
        {

            if (entityDto == null) throw new Exception(GlobalErrorsMessagesException.ObjIsNull);

            entityDto.Registered = DateTime.Now;
            entityDto.Deleted = DateTime.MinValue;

            var expensesList = MonthlyFixedExpensesListMake(entityDto);

            var listToDb = _MAP.Map<List<MonthlyFixedExpense>>(expensesList);

            _GENERIC_REPO.MonthlyFixedExpenses.AddRangeAsync(listToDb);

            if (await _GENERIC_REPO.save())
                return HttpStatusCode.Created;

            return HttpStatusCode.BadRequest;
        }
        public async Task<HttpStatusCode> AddCategoryExpensesAsync(CategoryExpenseDto entityDto)
        {

            if (entityDto == null) throw new Exception(GlobalErrorsMessagesException.ObjIsNull);

            var EntityToDb = _MAP.Map<CategoryExpense>(entityDto);

            _GENERIC_REPO.CategoriesExpenses.Add(EntityToDb);

            if (await _GENERIC_REPO.save())
                return HttpStatusCode.Created;

            return HttpStatusCode.BadRequest;
        }
        public async Task<bool> CreateMonthlyFixedExpensesTrackingForNewYear(int companyId)
        {

            var fromDb = await _GENERIC_REPO.MonthlyFixedExpenses.Get(
                x => x.CompanyId == companyId,
                null
                ).AsNoTracking().ToListAsync();

            fromDb.ForEach(x =>
            {
                if (x.Expires.Year < CurrentDate.Year)
                {
                    var domainToDto = _MAP.Map<MonthlyFixedExpenseDto>(x);
                }

            });

            _GENERIC_REPO.MonthlyFixedExpenses.UpdateRange(fromDb);

            if (await _GENERIC_REPO.save())
            {
                return true;
            }

            return false;
        }
        public async Task<List<MonthlyFixedExpenseDto>> GetAllAsync(int companyId)
        {
            var fromDb = await _GENERIC_REPO.MonthlyFixedExpenses.Get(
                predicate => predicate.CompanyId == companyId && predicate.Deleted == DateTime.MinValue,
                 toInclude => toInclude.AsNoTracking().Include(x => x.CategoryExpense)
                 .Include(x => x.SubcategoryExpense),
                selector => selector
                ).AsNoTracking().ToListAsync();

            if (fromDb == null) throw new Exception(GlobalErrorsMessagesException.ObjIsNull);

            var toViewDto = _MAP.Map<List<MonthlyFixedExpenseDto>>(fromDb);

            return toViewDto;

        }
        public async Task<PagedList<MonthlyFixedExpenseDto>> GetAllPagedAsync(Params parameters)
        {
            Func<IQueryable<MonthlyFixedExpense>, IOrderedQueryable<MonthlyFixedExpense>> orderBy = null;

            var fromDb = await _GENERIC_REPO.MonthlyFixedExpenses.GetPaged(
              parameters,
                                         predicate => predicate.Id == parameters.predicate && predicate.Deleted == DateTime.MinValue,
                                         toInclude => toInclude.Include(x => x.CategoryExpense),
                                         selector => selector,
                                         orderBy,
                                         null
                );

            if (fromDb == null) throw new GlobalServicesException(GlobalErrorsMessagesException.ObjIsNull);

            var ViewDto = _MAP.Map<List<MonthlyFixedExpenseDto>>(fromDb);

            var PgDto = new PagedList<MonthlyFixedExpenseDto>()
            {
                CurrentPg = fromDb.CurrentPg,
                TotalPgs = fromDb.TotalPgs,
                PgSize = fromDb.PgSize,
                TotalCount = fromDb.TotalCount,
                HasPrevious = fromDb.HasPrevious,
                HasNext = fromDb.HasNext,
                EntitiesToShow = ViewDto
            };
            return PgDto;

        }
        public async Task<MonthlyFixedExpenseDto> GetByIdAllIncluded(int monthlyFixedExpensesI)
        {
            var entityFromDb = await _GENERIC_REPO.MonthlyFixedExpenses.GetById(
                 predicate => predicate.Id == monthlyFixedExpensesI && predicate.Deleted == DateTime.MinValue,
                toInclude =>
                toInclude
                .Include(x => x.CategoryExpense)
                .Include(x => x.SubcategoryExpense)
                .Include(x => x.User)
                .Include(x => x.BankAccount)
                .Include(x => x.Card)
                .Include(x => x.Pix),
                selector => selector);

            if (entityFromDb == null) throw new GlobalServicesException(GlobalErrorsMessagesException.ObjIsNull);

            var toReturnViewDto = _MAP.Map<MonthlyFixedExpenseDto>(entityFromDb);

            return toReturnViewDto;
        }
        public async Task<HttpStatusCode> UpdateAsync(int fixedExpensesTrackingId, MonthlyFixedExpensePaymentDto entity)
        {
            if (entity == null) throw new GlobalServicesException(GlobalErrorsMessagesException.ObjIsNull);
            if (fixedExpensesTrackingId != entity.Id) throw new GlobalServicesException(GlobalErrorsMessagesException.IdIsDifferentFromEntityUpdate);

            var fromDb = await _GENERIC_REPO.MonthlyFixedExpenses.GetById(
                x => x.Id == fixedExpensesTrackingId,
                null,
                selector => selector
                );

            var updated = _MAP.Map(entity, fromDb);
            updated.WasPaid = DateTime.Now;
            updated.Price += updated.Interest;

            if (entity.PixId != null)
                _GENERIC_REPO.PixesExpenses.Add(CheckSourcePix(updated, entity.Id, "monthly", entity.PixExpense));

            var bankBalanceUpdate = await _ICOMMONFORFINANCIALSERVICES.GetBankAccountByIdUpdateBalance(updated.BankAccountId ?? 0, updated.Price);

            if (bankBalanceUpdate != null)
                _GENERIC_REPO.BankAccounts.Update(bankBalanceUpdate);

            _GENERIC_REPO.MonthlyFixedExpenses.Update(updated);

            if (await _GENERIC_REPO.save())
                return HttpStatusCode.OK;

            return HttpStatusCode.BadRequest;
        }

    }
}