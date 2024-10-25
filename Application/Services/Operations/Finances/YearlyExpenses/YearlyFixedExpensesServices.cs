using System.Threading.Tasks;
using System.Collections.Generic;
using System;
using Application.Exceptions;
using Microsoft.EntityFrameworkCore;
using Pagination.Models;
using System.Linq;
using System.Net;

using UnitOfWork.Persistence.Operations;
using Domain.Entities.Finances.YearlyExpenses;
using Application.Services.Operations.Finances.Dtos.YearlyExpenses;
using Application.Services.Operations.Finances.CommonForServices;
using Application.Services.Operations.Finances.Dtos;

namespace Application.Services.Operations.Finances.YearlyExpenses
{
    public class YearlyFixedExpensesServices : InheritanceForFinancialServices, IYearlyFixedExpensesServices
    {
        private readonly IFinancialObjectMapperServices _IObjectMapperServices;
        private readonly IUnitOfWork _GENERIC_REPO;
        private readonly ICommonForFinancialServices _ICOMMONFORFINANCIALSERVICES;
        public YearlyFixedExpensesServices(
            IUnitOfWork GENERIC_REPO,
            IFinancialObjectMapperServices IObjectMapperServices,
            ICommonForFinancialServices ICOMMONFORFINANCIALSERVICES
            )
        {
            _GENERIC_REPO = GENERIC_REPO;
            _IObjectMapperServices = IObjectMapperServices;
            _ICOMMONFORFINANCIALSERVICES = ICOMMONFORFINANCIALSERVICES;
        }
        public async Task<HttpStatusCode> AddAsync(YearlyFixedExpenseDto entityDto)
        {

            if (entityDto == null) throw new Exception(GlobalErrorsMessagesException.ObjIsNull);

            entityDto.Registered = DateTime.Now;
            entityDto.Deleted = DateTime.MinValue;

            var EntityToDb = _IObjectMapperServices.YearlyFixedExpenseMapper(entityDto);

            _GENERIC_REPO.YearlyFixedExpenses.Add(EntityToDb);

            if (await _GENERIC_REPO.save())
                return HttpStatusCode.OK;

            return HttpStatusCode.BadRequest;
        }
        public async Task<List<YearlyFixedExpenseDto>> GetAllAsync(int companyId)
        {
            var fromDb = await _GENERIC_REPO.YearlyFixedExpenses.Get(
                predicate => predicate.CompanyId == companyId && predicate.Deleted == DateTime.MinValue,
                null,
                //  toInclude => toInclude.Include(x => x.CategoryExpense)
                //  .Include(x => x.SubcategoryExpense),
                selector => selector
                ).ToListAsync();

            if (fromDb == null) throw new Exception(GlobalErrorsMessagesException.ObjIsNull);

            var toViewDto = _IObjectMapperServices.YearlyFixedExpensesListMake(fromDb);

            return toViewDto;

        }
        public async Task<PagedList<YearlyFixedExpenseDto>> GetAllPagedAsync(Params parameters)
        {
            Func<IQueryable<YearlyFixedExpense>, IOrderedQueryable<YearlyFixedExpense>> orderBy = null;

            var fromDb = await _GENERIC_REPO.YearlyFixedExpenses.GetPaged(
              parameters,
                                         predicate => predicate.Id == parameters.predicate && predicate.Deleted == DateTime.MinValue,
                                         toInclude => toInclude.Include(x => x.CategoryExpense),
                                         selector => selector,
                                         orderBy,
                                         null
                );

            if (fromDb == null) throw new GlobalServicesException(GlobalErrorsMessagesException.ObjIsNull);

            var ViewDto = _IObjectMapperServices.YearlyFixedExpensesListMake(fromDb);

            var PgDto = new PagedList<YearlyFixedExpenseDto>()
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
        public async Task<YearlyFixedExpenseDto> GetByIdAllIncluded(int yearlyFixedExpensesId)
        {

            var entityFromDb = await _GENERIC_REPO.YearlyFixedExpenses.GetById(
                 predicate => predicate.Id == yearlyFixedExpensesId && predicate.Deleted == DateTime.MinValue,
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

            var toReturnViewDto = _IObjectMapperServices.YearlyFixedExpenseMapper(entityFromDb);

            return toReturnViewDto;
        }
        public async Task<HttpStatusCode> UpdateAsync(int yearlyFixedExpensesId, YearlyFixedExpensePaymentDto entity)
        {
            if (entity == null) throw new GlobalServicesException(GlobalErrorsMessagesException.ObjIsNull);
            if (yearlyFixedExpensesId != entity.Id) throw new GlobalServicesException(GlobalErrorsMessagesException.IdIsDifferentFromEntityUpdate);

            var fromDb = await _GENERIC_REPO.YearlyFixedExpenses.GetById(
                x => x.Id == yearlyFixedExpensesId,
                null,
                selector => selector
                );

            var updated = _IObjectMapperServices.YearlyFixedExpenseMapper(entity);

            updated.WasPaid = DateTime.Now;
            updated.Price += updated.Interest;

            if (entity.PixId != null)
                _GENERIC_REPO.PixesExpenses.Add(CheckSourcePix(updated, entity.Id, "yearly", entity.PixExpense));

            var bankBalanceUpdate = await _ICOMMONFORFINANCIALSERVICES.GetBankAccountByIdUpdateBalance(updated.BankAccountId ?? 0, updated.Price);

            if (bankBalanceUpdate != null)
                _GENERIC_REPO.BankAccounts.Update(bankBalanceUpdate);
                
            _GENERIC_REPO.YearlyFixedExpenses.Update(updated);

            var result = await _GENERIC_REPO.save();

            if (result)
                return HttpStatusCode.OK;

            return HttpStatusCode.BadRequest;
        }

    }
}