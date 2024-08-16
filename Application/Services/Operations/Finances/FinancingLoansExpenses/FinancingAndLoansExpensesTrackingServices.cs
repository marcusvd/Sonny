using System.Threading.Tasks;
using AutoMapper;
using UnitOfWork.Persistence.Operations;
using System;
using Application.Services.Operations.Finances.Dtos.FinancingLoansExpenses;
using Domain.Entities.Finances.FinancingLoansExpenses;
using Application.Exceptions;
using System.Collections.Generic;
using System.Net;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using Pagination.Models;

namespace Application.Services.Operations.Finances.FinancingLoansExpenses
{
    public class FinancingAndLoansExpensesTrackingServices : IFinancingAndLoansExpensesTrackingServices
    {
        private readonly IMapper _MAP;
        private readonly IUnitOfWork _GENERIC_REPO;
        public FinancingAndLoansExpensesTrackingServices(
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
        public async Task<HttpStatusCode> AddAsync(FinancingAndLoansExpensesTrackingDto entityDto)
        {
            // if (await CheckToAddAsync(entityDto))
            // {

                if (entityDto == null) throw new Exception(GlobalErrorsMessagesException.ObjIsNull);

                FinancingAndLoansExpensesTracking entityToDb = _MAP.Map<FinancingAndLoansExpensesTracking>(entityDto);

                _GENERIC_REPO.FinancingAndLoansExpensesTrackings.Add(entityToDb);

                if (await _GENERIC_REPO.save())
                    return HttpStatusCode.Created;
            // }

            return HttpStatusCode.BadRequest;
        }
        // public async Task<bool> CheckToAddAsync(FinancingAndLoansExpensesTrackingDto entityDto)
        // {

        //     var expensesBase = await _GENERIC_REPO.MonthFixedExpenses.GetById(
        //         predicate => predicate.Id == entityDto.MonthFixedExpensesId,
        //         null,
        //         selector => selector
        //         );

        //     if (expensesBase == null) throw new Exception(GlobalErrorsMessagesException.ObjIsNull);

        //     var FixedExpensesTracking = await _GENERIC_REPO.FinancingAndLoansExpensesTrackings.Get(
        //         predicate => predicate.MonthFixedExpensesId == entityDto.MonthFixedExpensesId,
        //         null,
        //         selector => selector
        //         ).ToListAsync();

        //     if (FixedExpensesTracking == null)
        //         return true;
     
        //     return true;

        // }

        public async Task<PagedList<FinancingAndLoansExpensesTrackingDto>> GetAllPagedAsync(Params parameters)
        {
            Func<IQueryable<FinancingAndLoansExpensesTracking>, IOrderedQueryable<FinancingAndLoansExpensesTracking>> orderBy = null;

            var fromDb = await _GENERIC_REPO.FinancingAndLoansExpensesTrackings.GetPaged(
              parameters,
                                         predicate => predicate.CompanyId == parameters.predicate && predicate.Deleted != true,
                                         toInclude => toInclude.Include(x => x.FinancingAndLoansExpenses),
                                         selector => selector,
                                         orderBy,
                                         null
                );

            if (fromDb == null) throw new GlobalServicesException(GlobalErrorsMessagesException.ObjIsNull);

            var ViewDto = _MAP.Map<List<FinancingAndLoansExpensesTrackingDto>>(fromDb);

            var PgDto = new PagedList<FinancingAndLoansExpensesTrackingDto>()
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
        public async Task<List<FinancingAndLoansExpensesTrackingDto>> GetAllByCompanyIdAsync(int id)
        {

            var fromDb = await _GENERIC_REPO.FinancingAndLoansExpensesTrackings.Get(
                x => x.CompanyId == id && x.Deleted != true,
                toInclude => toInclude.Include(x => x.FinancingAndLoansExpenses)
               .ThenInclude(x=> x.CategoryExpenses)
               .Include(x=> x.FinancingAndLoansExpenses)
               .ThenInclude(x=> x.SubcategoryExpenses),
                selector => selector,
                orderBy => orderBy.OrderBy(x => x.FinancingAndLoansExpenses.CategoryExpenses)
                ).ToListAsync();

            var toReturn = _MAP.Map<List<FinancingAndLoansExpensesTrackingDto>>(fromDb);

            if (fromDb == null) throw new GlobalServicesException(GlobalErrorsMessagesException.ObjIsNull);

            return toReturn;
        }

        public async Task<FinancingAndLoansExpensesTrackingDto> GetByIdAllIncluded(int FixedExpensesTrackingId)
        {

            var entityFromDb = await _GENERIC_REPO.FinancingAndLoansExpensesTrackings.GetById(
                 predicate => predicate.Id == FixedExpensesTrackingId && predicate.Deleted != true,
                toInclude =>
                toInclude
                .Include(x => x.Company)
                .Include(x => x.User)
                .Include(x => x.FinancingAndLoansExpenses)
                .ThenInclude(x=> x.CategoryExpenses)
                .Include(x => x.FinancingAndLoansExpenses)
                .ThenInclude(x=> x.SubcategoryExpenses)
                .Include(x => x.BankAccount)
                .Include(x => x.Card)
                .Include(x => x.Pix),
                selector => selector);

            if (entityFromDb == null) throw new GlobalServicesException(GlobalErrorsMessagesException.ObjIsNull);

            var toReturnViewDto = _MAP.Map<FinancingAndLoansExpensesTrackingDto>(entityFromDb);

            return toReturnViewDto;



        }

        public async Task<HttpStatusCode> UpdateAsync(int fixedExpensesTrackingId, FinancingAndLoansExpensesTrackingDto entity)
        {
            if (entity == null) throw new GlobalServicesException(GlobalErrorsMessagesException.ObjIsNull);
            if (fixedExpensesTrackingId != entity.Id) throw new GlobalServicesException(GlobalErrorsMessagesException.IdIsDifferentFromEntityUpdate);

            var fromDb = await _GENERIC_REPO.FinancingAndLoansExpensesTrackings.GetById(
                x => x.Id == fixedExpensesTrackingId,
                null,
                selector => selector
                );

            var updated = _MAP.Map(entity, fromDb);
            updated.WasPaid = DateTime.Now;

            _GENERIC_REPO.FinancingAndLoansExpensesTrackings.Update(updated);

            var result = await _GENERIC_REPO.save();

            if (result)
                return HttpStatusCode.OK;

            return HttpStatusCode.BadRequest;
        }

    }

}