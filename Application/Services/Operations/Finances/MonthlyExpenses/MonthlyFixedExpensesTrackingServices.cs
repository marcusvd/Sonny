using System.Threading.Tasks;
using AutoMapper;
using UnitOfWork.Persistence.Operations;
using System;
using Application.Services.Operations.Finances.Dtos;
using Domain.Entities.Finances.MonthlyExpenses;
using Application.Exceptions;
using Application.Services.Operations.Finances.BusinessRulesValidation;
using System.Collections.Generic;
using System.Net;
using Domain.Entities.Finances.Enums;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using Pagination.Models;

namespace Application.Services.Operations.Finances.MonthlyExpenses
{
    public class MonthlyFixedExpensesTrackingServices : IMonthlyFixedExpensesTrackingServices
    {
        private readonly IMapper _MAP;
        private readonly IUnitOfWork _GENERIC_REPO;
        public MonthlyFixedExpensesTrackingServices(
                         IUnitOfWork GENERIC_REPO,
                         IMapper MAP
                        )
        {
            _MAP = MAP;
            _GENERIC_REPO = GENERIC_REPO;
        }
        // public void AddEssentialExpensesTest(int companyId)
        // {
        //     _GENERIC_REPO.MonthlyFixedExpensesTrackings.FillFixedExpensesTracking(companyId);
        // }
        public async Task<HttpStatusCode> AddAsync(MonthlyFixedExpenseTrackingDto entityDto)
        {
            // if (await CheckToAddAsync(entityDto))
            // {

                if (entityDto == null) throw new Exception(GlobalErrorsMessagesException.ObjIsNull);

                MonthlyFixedExpenseTracking entityToDb = _MAP.Map<MonthlyFixedExpenseTracking>(entityDto);

                _GENERIC_REPO.MonthlyFixedExpensesTrackings.Add(entityToDb);

                if (await _GENERIC_REPO.save())
                    return HttpStatusCode.Created;
            // }

            return HttpStatusCode.BadRequest;
        }
        // public async Task<bool> CheckToAddAsync(MonthlyFixedExpenseTrackingDto entityDto)
        // {

        //     var expensesBase = await _GENERIC_REPO.MonthlyFixedExpenses.GetById(
        //         predicate => predicate.Id == entityDto.MonthlyFixedExpensesId,
        //         null,
        //         selector => selector
        //         );

        //     if (expensesBase == null) throw new Exception(GlobalErrorsMessagesException.ObjIsNull);

        //     var FixedExpensesTracking = await _GENERIC_REPO.MonthlyFixedExpensesTrackings.Get(
        //         predicate => predicate.MonthlyFixedExpensesId == entityDto.MonthlyFixedExpensesId,
        //         null,
        //         selector => selector
        //         ).ToListAsync();

        //     if (FixedExpensesTracking == null)
        //         return true;
     
        //     return true;

        // }

        public async Task<PagedList<MonthlyFixedExpenseTrackingDto>> GetAllPagedAsync(Params parameters)
        {
            Func<IQueryable<MonthlyFixedExpenseTracking>, IOrderedQueryable<MonthlyFixedExpenseTracking>> orderBy = null;

            var fromDb = await _GENERIC_REPO.MonthlyFixedExpensesTrackings.GetPaged(
              parameters,
                                         predicate => predicate.CompanyId == parameters.predicate && predicate.Deleted != true,
                                         toInclude => toInclude.Include(x => x.MonthlyFixedExpense),
                                         selector => selector,
                                         orderBy,
                                         null
                );

            if (fromDb == null) throw new GlobalServicesException(GlobalErrorsMessagesException.ObjIsNull);

            var ViewDto = _MAP.Map<List<MonthlyFixedExpenseTrackingDto>>(fromDb);

            var PgDto = new PagedList<MonthlyFixedExpenseTrackingDto>()
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
        public async Task<List<MonthlyFixedExpenseTrackingDto>> GetAllByCompanyIdAsync(int id)
        {

            var fromDb = await _GENERIC_REPO.MonthlyFixedExpensesTrackings.Get(
                x => x.CompanyId == id && x.Deleted != true,
                toInclude => 
                toInclude.Include(x => x.MonthlyFixedExpense)
               .ThenInclude(x=> x.CategoryExpense)
                .Include(x => x.MonthlyFixedExpense)
               .ThenInclude(x=> x.SubcategoryExpense),
                selector => selector,
                orderBy => orderBy.OrderBy(x => x.MonthlyFixedExpense.CategoryExpense)
                ).ToListAsync();

            var toReturn = _MAP.Map<List<MonthlyFixedExpenseTrackingDto>>(fromDb);

            if (fromDb == null) throw new GlobalServicesException(GlobalErrorsMessagesException.ObjIsNull);

            return toReturn;
        }

        public async Task<MonthlyFixedExpenseTrackingDto> GetByIdAllIncluded(int FixedExpensesTrackingId)
        {

            var entityFromDb = await _GENERIC_REPO.MonthlyFixedExpensesTrackings.GetById(
                 predicate => predicate.Id == FixedExpensesTrackingId && predicate.Deleted != true,
                toInclude =>
                toInclude
                .Include(x => x.Company)
                .Include(x => x.User)
                .Include(x => x.MonthlyFixedExpense)
                .ThenInclude(x=> x.CategoryExpense)
                .Include(x => x.MonthlyFixedExpense)
                .ThenInclude(x=> x.SubcategoryExpense)
                .Include(x => x.BankAccount)
                .Include(x => x.Card)
                .Include(x => x.Pix),
                selector => selector);

            if (entityFromDb == null) throw new GlobalServicesException(GlobalErrorsMessagesException.ObjIsNull);

            var toReturnViewDto = _MAP.Map<MonthlyFixedExpenseTrackingDto>(entityFromDb);

            return toReturnViewDto;



        }

        public async Task<HttpStatusCode> UpdateAsync(int fixedExpensesTrackingId, MonthlyFixedExpenseTrackingDto entity)
        {
            if (entity == null) throw new GlobalServicesException(GlobalErrorsMessagesException.ObjIsNull);
            if (fixedExpensesTrackingId != entity.Id) throw new GlobalServicesException(GlobalErrorsMessagesException.IdIsDifferentFromEntityUpdate);

            var fromDb = await _GENERIC_REPO.MonthlyFixedExpensesTrackings.GetById(
                x => x.Id == fixedExpensesTrackingId,
                null,
                selector => selector
                );

            var updated = _MAP.Map(entity, fromDb);
            updated.WasPaid = DateTime.Now;

            _GENERIC_REPO.MonthlyFixedExpensesTrackings.Update(updated);

            var result = await _GENERIC_REPO.save();

            if (result)
                return HttpStatusCode.OK;

            return HttpStatusCode.BadRequest;
        }

    }

}