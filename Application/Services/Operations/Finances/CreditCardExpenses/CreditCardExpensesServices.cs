using System.Threading.Tasks;
using AutoMapper;
using UnitOfWork.Persistence.Operations;
using System.Collections.Generic;
using System;
using Application.Exceptions;
using System.Net;
using Application.Services.Operations.Finances.InheritanceServices;
using Application.Services.Operations.Finances.Dtos.CreditCardExpenses;
using Domain.Entities.Finances.CreditCardExppenses;
using Microsoft.EntityFrameworkCore;
using System.Linq;

namespace Application.Services.Operations.Finances.CreditCardExpenses
{
    public class CreditCardExpensesServices : CommonFinancialForServices, ICreditCardExpensesServices
    {
        private readonly IMapper _MAP;
        private readonly IUnitOfWork _GENERIC_REPO;
        public CreditCardExpensesServices(
            IUnitOfWork GENERIC_REPO,
            IMapper MAP
            )
        {
            _GENERIC_REPO = GENERIC_REPO;
            _MAP = MAP;
        }
        public async Task<HttpStatusCode> AddCreditCardExpenseAsync(CreditCardExpenseDto entityDto)
        {

            if (entityDto == null) throw new Exception(GlobalErrorsMessagesException.ObjIsNull);

            entityDto.Registered = DateTime.Now;

            var toDb = entityDto;

            toDb.CreditCardExpensesInstallments = CreditCardExpensesInstallmentListMake(entityDto);

            var entityToDto = _MAP.Map<CreditCardExpense>(toDb);

            _GENERIC_REPO.CreditCardExpenses.Add(entityToDto);

            if (await _GENERIC_REPO.save())
                return HttpStatusCode.Created;

            return HttpStatusCode.BadRequest;
        }

        public async Task<List<CreditCardExpenseDto>> GetAllAsync(int companyId)
        {
            var fromDb = await _GENERIC_REPO.CreditCardExpenses.Get(
                predicate => predicate.CompanyId == companyId && predicate.Deleted != true,
                toInclude => toInclude.AsNoTracking().Include(x => x.CreditCardExpensesInstallments)
                .ThenInclude(x => x.CategoryExpense)
                .Include(x => x.CreditCardExpensesInstallments)
                .ThenInclude(x => x.CreditCardExpense),

                //  .Include(x => x.SubcategoryExpense),
                selector => selector
                ).AsNoTracking().ToListAsync();

            if (fromDb == null) throw new Exception(GlobalErrorsMessagesException.ObjIsNull);

            var toViewDto = _MAP.Map<List<CreditCardExpenseDto>>(fromDb);

            return toViewDto;

        }

        // public async Task<HttpStatusCode> AddCategoryExpensesAsync(CategoryExpenseDto entityDto)
        // {

        //     if (entityDto == null) throw new Exception(GlobalErrorsMessagesException.ObjIsNull);

        //     var EntityToDb = _MAP.Map<CategoryExpense>(entityDto);

        //     _GENERIC_REPO.CategoriesExpenses.Add(EntityToDb);

        //     if (await _GENERIC_REPO.save())
        //     {
        //         return HttpStatusCode.Created;
        //     }

        //     return HttpStatusCode.BadRequest;
        // }
        // public async Task<bool> CreateMonthlyFixedExpensesTrackingForNewYear(int companyId)
        // {

        //     var fromDb = await _GENERIC_REPO.MonthlyFixedExpenses.Get(
        //         x => x.CompanyId == companyId,
        //     null
        //     //    toInclude => toInclude.AsNoTracking().Include(x => x.CategoryExpenses)
        //         ).AsNoTracking().ToListAsync();


        //     fromDb.ForEach(x =>
        //     {
        //         if (x.Expires.Year < CurrentDate.Year)
        //         {
        //             var domainToDto = _MAP.Map<MonthlyFixedExpenseDto>(x);
        //             // x.MonthlyFixedExpenses = _MAP.Map<List<MonthlyFixedExpenseTracking>>(AddMonthlyFixedExpensesTracking(domainToDto));
        //         }
        //     });



        //     _GENERIC_REPO.MonthlyFixedExpenses.UpdateRange(fromDb);

        //     if (await _GENERIC_REPO.save())
        //     {
        //         return true;
        //     }

        //     return false;
        // }
        // public async Task<List<MonthlyFixedExpenseDto>> GetAllAsync(int companyId)
        // {
        //     var fromDb = await _GENERIC_REPO.MonthlyFixedExpenses.Get(
        //         predicate => predicate.CompanyId == companyId && predicate.Deleted != true,
        //          //  toInclude => toInclude.AsNoTracking().Include(x => x.MonthlyFixedExpensesTracking)
        //          toInclude => toInclude.AsNoTracking().Include(x => x.CategoryExpense)
        //          .Include(x => x.SubcategoryExpense),
        //         selector => selector
        //         ).AsNoTracking().ToListAsync();

        //     if (fromDb == null) throw new Exception(GlobalErrorsMessagesException.ObjIsNull);

        //     var toViewDto = _MAP.Map<List<MonthlyFixedExpenseDto>>(fromDb);

        //     return toViewDto;

        // }
        // public async Task<PagedList<MonthlyFixedExpenseDto>> GetAllPagedAsync(Params parameters)
        // {
        //     Func<IQueryable<MonthlyFixedExpense>, IOrderedQueryable<MonthlyFixedExpense>> orderBy = null;

        //     var fromDb = await _GENERIC_REPO.MonthlyFixedExpenses.GetPaged(
        //       parameters,
        //                                  predicate => predicate.Id == parameters.predicate && predicate.Deleted != true,
        //                                  toInclude => toInclude.Include(x => x.CategoryExpense),
        //                                  selector => selector,
        //                                  orderBy,
        //                                  null
        //         );

        //     if (fromDb == null) throw new GlobalServicesException(GlobalErrorsMessagesException.ObjIsNull);

        //     var ViewDto = _MAP.Map<List<MonthlyFixedExpenseDto>>(fromDb);

        //     var PgDto = new PagedList<MonthlyFixedExpenseDto>()
        //     {
        //         CurrentPg = fromDb.CurrentPg,
        //         TotalPgs = fromDb.TotalPgs,
        //         PgSize = fromDb.PgSize,
        //         TotalCount = fromDb.TotalCount,
        //         HasPrevious = fromDb.HasPrevious,
        //         HasNext = fromDb.HasNext,
        //         EntitiesToShow = ViewDto
        //     };
        //     return PgDto;

        // }
        // public async Task<MonthlyFixedExpenseDto> GetByIdAllIncluded(int monthlyFixedExpensesI)
        // {
        //     var entityFromDb = await _GENERIC_REPO.MonthlyFixedExpenses.GetById(
        //          predicate => predicate.Id == monthlyFixedExpensesI && predicate.Deleted != true,
        //         toInclude =>
        //         toInclude
        //         .Include(x => x.CategoryExpense)
        //         .Include(x => x.SubcategoryExpense)
        //         .Include(x => x.User)
        //         .Include(x => x.BankAccount)
        //         .Include(x => x.Card)
        //         .Include(x => x.Pix),
        //         selector => selector);

        //     if (entityFromDb == null) throw new GlobalServicesException(GlobalErrorsMessagesException.ObjIsNull);

        //     var toReturnViewDto = _MAP.Map<MonthlyFixedExpenseDto>(entityFromDb);

        //     return toReturnViewDto;
        // }

        // public async Task<HttpStatusCode> UpdateAsync(int fixedExpensesTrackingId, MonthlyFixedExpenseDto entity)
        // {
        //     if (entity == null) throw new GlobalServicesException(GlobalErrorsMessagesException.ObjIsNull);
        //     if (fixedExpensesTrackingId != entity.Id) throw new GlobalServicesException(GlobalErrorsMessagesException.IdIsDifferentFromEntityUpdate);

        //     var fromDb = await _GENERIC_REPO.MonthlyFixedExpenses.GetById(
        //         x => x.Id == fixedExpensesTrackingId,
        //         null,
        //         selector => selector
        //         );

        //     var updated = _MAP.Map(entity, fromDb);
        //     updated.WasPaid = DateTime.Now;

        //     _GENERIC_REPO.MonthlyFixedExpenses.Update(updated);

        //     var result = await _GENERIC_REPO.save();

        //     if (result)
        //         return HttpStatusCode.OK;

        //     return HttpStatusCode.BadRequest;
        // }

    }
}