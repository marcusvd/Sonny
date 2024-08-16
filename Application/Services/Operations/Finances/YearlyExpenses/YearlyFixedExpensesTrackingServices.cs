using System.Threading.Tasks;
using AutoMapper;
using UnitOfWork.Persistence.Operations;
using System;
using Application.Services.Operations.Finances.Dtos;
using Domain.Entities.Finances.YearlyExpenses;
using Application.Exceptions;
using System.Collections.Generic;
using System.Net;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using Pagination.Models;


namespace Application.Services.Operations.Finances.YearlyExpenses
{
    public class YearlyFixedExpensesTrackingServices : IYearlyFixedExpensesTrackingServices
    {
        private readonly IMapper _MAP;
        private readonly IUnitOfWork _GENERIC_REPO;
        public YearlyFixedExpensesTrackingServices(
                         IUnitOfWork GENERIC_REPO,
                         IMapper MAP
                        )
        {
            _MAP = MAP;
            _GENERIC_REPO = GENERIC_REPO;
        }
        // public void AddEssentialExpensesTest(int companyId)
        // {
        //     _GENERIC_REPO.MonthFixedExpensesTrackings.FillFixedExpensesTracking(companyId);
        // }
        public async Task<HttpStatusCode> AddAsync(YearlyFixedExpenseTrackingDto entityDto)
        {
            // if (await CheckToAddAsync(entityDto))
            // {

                if (entityDto == null) throw new Exception(GlobalErrorsMessagesException.ObjIsNull);

                YearlyFixedExpenseTracking entityToDb = _MAP.Map<YearlyFixedExpenseTracking>(entityDto);

                _GENERIC_REPO.YearlyFixedExpensesTrackings.Add(entityToDb);

                if (await _GENERIC_REPO.save())
                    return HttpStatusCode.Created;
            // }

            return HttpStatusCode.BadRequest;
        }
        // public async Task<bool> CheckToAddAsync(YearlyFixedExpensesTrackingDto entityDto)
        // {

        //     var expensesBase = await _GENERIC_REPO.MonthFixedExpenses.GetById(
        //         predicate => predicate.Id == entityDto.MonthFixedExpensesId,
        //         null,
        //         selector => selector
        //         );

        //     if (expensesBase == null) throw new Exception(GlobalErrorsMessagesException.ObjIsNull);

        //     var FixedExpensesTracking = await _GENERIC_REPO.YearlyFixedExpensesTrackings.Get(
        //         predicate => predicate.MonthFixedExpensesId == entityDto.MonthFixedExpensesId,
        //         null,
        //         selector => selector
        //         ).ToListAsync();

        //     if (FixedExpensesTracking == null)
        //         return true;
     
        //     return true;

        // }

        public async Task<PagedList<YearlyFixedExpenseTrackingDto>> GetAllPagedAsync(Params parameters)
        {
            Func<IQueryable<YearlyFixedExpenseTracking>, IOrderedQueryable<YearlyFixedExpenseTracking>> orderBy = null;

            var fromDb = await _GENERIC_REPO.YearlyFixedExpensesTrackings.GetPaged(
              parameters,
                                         predicate => predicate.CompanyId == parameters.predicate && predicate.Deleted != true,
                                         toInclude => toInclude.Include(x => x.YearlyFixedExpense),
                                         selector => selector,
                                         orderBy,
                                         null
                );

            if (fromDb == null) throw new GlobalServicesException(GlobalErrorsMessagesException.ObjIsNull);

            var ViewDto = _MAP.Map<List<YearlyFixedExpenseTrackingDto>>(fromDb);

            var PgDto = new PagedList<YearlyFixedExpenseTrackingDto>()
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
        public async Task<List<YearlyFixedExpenseTrackingDto>> GetAllByCompanyIdAsync(int id)
        {

            var fromDb = await _GENERIC_REPO.YearlyFixedExpensesTrackings.Get(
                x => x.CompanyId == id && x.Deleted != true,
                toInclude => toInclude.Include(x => x.YearlyFixedExpense)
               .ThenInclude(x=> x.CategoryExpense)
               .Include(x=> x.YearlyFixedExpense)
               .ThenInclude(x=> x.SubcategoryExpense),
                selector => selector,
                orderBy => orderBy.OrderBy(x => x.YearlyFixedExpense.CategoryExpense)
                ).ToListAsync();

            var toReturn = _MAP.Map<List<YearlyFixedExpenseTrackingDto>>(fromDb);

            if (fromDb == null) throw new GlobalServicesException(GlobalErrorsMessagesException.ObjIsNull);

            return toReturn;
        }

        public async Task<YearlyFixedExpenseTrackingDto> GetByIdAllIncluded(int FixedExpensesTrackingId)
        {

            var entityFromDb = await _GENERIC_REPO.YearlyFixedExpensesTrackings.GetById(
                 predicate => predicate.Id == FixedExpensesTrackingId && predicate.Deleted != true,
                toInclude =>
                toInclude
                .Include(x => x.Company)
                .Include(x => x.User)
                .Include(x => x.YearlyFixedExpense)
                .ThenInclude(x=> x.CategoryExpense)
                .Include(x => x.YearlyFixedExpense)
                .ThenInclude(x=> x.SubcategoryExpense)
                .Include(x => x.BankAccount)
                .Include(x => x.Card)
                .Include(x => x.Pix),
                selector => selector);

            if (entityFromDb == null) throw new GlobalServicesException(GlobalErrorsMessagesException.ObjIsNull);

            var toReturnViewDto = _MAP.Map<YearlyFixedExpenseTrackingDto>(entityFromDb);

            return toReturnViewDto;



        }

        public async Task<HttpStatusCode> UpdateAsync(int fixedExpensesTrackingId, YearlyFixedExpenseTrackingDto entity)
        {
            if (entity == null) throw new GlobalServicesException(GlobalErrorsMessagesException.ObjIsNull);
            if (fixedExpensesTrackingId != entity.Id) throw new GlobalServicesException(GlobalErrorsMessagesException.IdIsDifferentFromEntityUpdate);

            var fromDb = await _GENERIC_REPO.YearlyFixedExpensesTrackings.GetById(
                x => x.Id == fixedExpensesTrackingId,
                null,
                selector => selector
                );

            var updated = _MAP.Map(entity, fromDb);
            updated.WasPaid = DateTime.Now;

            _GENERIC_REPO.YearlyFixedExpensesTrackings.Update(updated);

            var result = await _GENERIC_REPO.save();

            if (result)
                return HttpStatusCode.OK;

            return HttpStatusCode.BadRequest;
        }

    }

}