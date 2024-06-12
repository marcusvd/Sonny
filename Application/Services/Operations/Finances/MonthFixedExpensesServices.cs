using System.Threading.Tasks;
using AutoMapper;
using UnitOfWork.Persistence.Operations;
using System.Collections.Generic;
using System;
using Application.Services.Operations.Finances.Dtos;
using Domain.Entities.Finances;
using Application.Exceptions;
using Application.Services.Operations.Finances.BusinessRulesValidation;
using Microsoft.EntityFrameworkCore;
using Pagination.Models;
using System.Linq;

namespace Application.Services.Operations.Finances
{
    public class MonthFixedExpensesServices : IMonthFixedExpensesServices
    {
        private readonly IMapper _MAP;
        private readonly IUnitOfWork _GENERIC_REPO;
        public MonthFixedExpensesServices(
            IUnitOfWork GENERIC_REPO,
            IMapper MAP
            )
        {
            _GENERIC_REPO = GENERIC_REPO;
            _MAP = MAP;
        }
        public async Task<MonthFixedExpensesDto> AddAsync(MonthFixedExpensesDto entityDto)
        {

            if (entityDto == null) throw new Exception(GlobalErrorsMessagesException.ObjIsNull);

            // FinancesAddBusinessRulesValidation.ExpirationGreaterThanCurrentDate(entityDto);

            entityDto.Registered = DateTime.Now;

            var EntityToDb = _MAP.Map<MonthFixedExpenses>(entityDto);

            _GENERIC_REPO.MonthFixedExpenses.Add(EntityToDb);

            if (await _GENERIC_REPO.save())
            {
                MonthFixedExpenses EntityFromDb = await _GENERIC_REPO.MonthFixedExpenses.GetById(
                    _id => _id.Id == EntityToDb.Id,
                    null,
                    selector => selector
                    );

                return _MAP.Map<MonthFixedExpensesDto>(EntityFromDb);
            }

            return entityDto;
        }

        public async Task<List<MonthFixedExpensesDto>> GetAllAsync(int companyId)
        {
            var fromDb = await _GENERIC_REPO.MonthFixedExpenses.Get(
                predicate => predicate.CompanyId == companyId && predicate.Deleted != true,
                 toInclude => toInclude.Include(x => x.MonthFixedExpensesTrackings),
                selector => selector
                ).ToListAsync();

            if (fromDb == null) throw new Exception(GlobalErrorsMessagesException.ObjIsNull);

            var toViewDto = _MAP.Map<List<MonthFixedExpensesDto>>(fromDb);

            return toViewDto;

        }

        public async Task<PagedList<MonthFixedExpensesDto>> GetAllPagedAsync(Params parameters)
        {
            Func<IQueryable<MonthFixedExpenses>, IOrderedQueryable<MonthFixedExpenses>> orderBy = null;

            var fromDb = await _GENERIC_REPO.MonthFixedExpenses.GetPaged(
              parameters,
                                         predicate => predicate.Id == parameters.predicate && predicate.Deleted != true,
                                         toInclude => toInclude.Include(x => x.MonthFixedExpensesTrackings),
                                         selector => selector,
                                         orderBy,
                                         null
                );

            if (fromDb == null) throw new GlobalServicesException(GlobalErrorsMessagesException.ObjIsNull);

            var ViewDto = _MAP.Map<List<MonthFixedExpensesDto>>(fromDb);

            var PgDto = new PagedList<MonthFixedExpensesDto>()
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


        public async Task<MonthFixedExpensesDto> GetByIdAllIncluded(int monthFixedExpensesId)
        {

            var entityFromDb = await _GENERIC_REPO.MonthFixedExpenses.GetById(
                 predicate => predicate.Id == monthFixedExpensesId && predicate.Deleted != true,
                toInclude =>
                toInclude
                .Include(x => x.MonthFixedExpensesTrackings),
                selector => selector);

            if (entityFromDb == null) throw new GlobalServicesException(GlobalErrorsMessagesException.ObjIsNull);

            var toReturnViewDto = _MAP.Map<MonthFixedExpensesDto>(entityFromDb);

            return toReturnViewDto;
        }

    }
}