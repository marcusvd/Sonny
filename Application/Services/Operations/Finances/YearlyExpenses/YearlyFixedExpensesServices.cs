using System.Threading.Tasks;
using AutoMapper;
using UnitOfWork.Persistence.Operations;
using System.Collections.Generic;
using System;
using Application.Services.Operations.Finances.Dtos;
using Domain.Entities.Finances;
using Application.Exceptions;
using Microsoft.EntityFrameworkCore;
using Pagination.Models;
using System.Linq;
using Application.Services.Operations.Finances.Inheritance;
using Domain.Entities.Finances.YearlyExpenses;

namespace Application.Services.Operations.Finances.YearlyExpenses
{
    public class YearlyFixedExpensesServices : CommonFinancialForServices, IYearlyFixedExpensesServices
    {
        private readonly IMapper _MAP;
        private readonly IUnitOfWork _GENERIC_REPO;
        public YearlyFixedExpensesServices(
            IUnitOfWork GENERIC_REPO,
            IMapper MAP
            )
        {
            _GENERIC_REPO = GENERIC_REPO;
            _MAP = MAP;
        }
        public async Task<YearlyFixedExpensesDto> AddAsync(YearlyFixedExpensesDto entityDto)
        {

            if (entityDto == null) throw new Exception(GlobalErrorsMessagesException.ObjIsNull);

            entityDto.Registered = DateTime.Now;
            entityDto.YearlyFixedExpensesTrackings = new List<YearlyFixedExpensesTrackingDto>();
            entityDto.YearlyFixedExpensesTrackings = AddYearlyFixedExpensesTracking(entityDto);

            var EntityToDb = _MAP.Map<YearlyFixedExpenses>(entityDto);

            _GENERIC_REPO.YearlyFixedExpenses.Add(EntityToDb);

            if (await _GENERIC_REPO.save())
            {
                YearlyFixedExpenses EntityFromDb = await _GENERIC_REPO.YearlyFixedExpenses.GetById(
                    _id => _id.Id == EntityToDb.Id,
                    null,
                    selector => selector
                    );

                return _MAP.Map<YearlyFixedExpensesDto>(EntityFromDb);
            }

            return entityDto;
        }
        public async Task<List<YearlyFixedExpensesDto>> GetAllAsync(int companyId)
        {
            var fromDb = await _GENERIC_REPO.YearlyFixedExpenses.Get(
                predicate => predicate.CompanyId == companyId && predicate.Deleted != true,
                 //  toInclude => toInclude.Include(x => x.YearlyFixedExpensesTrackings)
                 toInclude => toInclude.Include(x => x.CategoryExpenses)
                 .Include(x => x.SubcategoryExpenses),
                selector => selector
                ).ToListAsync();

            if (fromDb == null) throw new Exception(GlobalErrorsMessagesException.ObjIsNull);

            var toViewDto = _MAP.Map<List<YearlyFixedExpensesDto>>(fromDb);

            return toViewDto;

        }
        public async Task<PagedList<YearlyFixedExpensesDto>> GetAllPagedAsync(Params parameters)
        {
            Func<IQueryable<YearlyFixedExpenses>, IOrderedQueryable<YearlyFixedExpenses>> orderBy = null;

            var fromDb = await _GENERIC_REPO.YearlyFixedExpenses.GetPaged(
              parameters,
                                         predicate => predicate.Id == parameters.predicate && predicate.Deleted != true,
                                         toInclude => toInclude.Include(x => x.YearlyFixedExpensesTrackings)
                                         .Include(x => x.CategoryExpenses),
                                         selector => selector,
                                         orderBy,
                                         null
                );

            if (fromDb == null) throw new GlobalServicesException(GlobalErrorsMessagesException.ObjIsNull);

            var ViewDto = _MAP.Map<List<YearlyFixedExpensesDto>>(fromDb);

            var PgDto = new PagedList<YearlyFixedExpensesDto>()
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
        public async Task<YearlyFixedExpensesDto> GetByIdAllIncluded(int yearlyFixedExpensesId)
        {

            var entityFromDb = await _GENERIC_REPO.YearlyFixedExpenses.GetById(
                 predicate => predicate.Id == yearlyFixedExpensesId && predicate.Deleted != true,
                toInclude =>
                toInclude
                .Include(x => x.CategoryExpenses)
                .Include(x => x.YearlyFixedExpensesTrackings),
                selector => selector);

            if (entityFromDb == null) throw new GlobalServicesException(GlobalErrorsMessagesException.ObjIsNull);

            var toReturnViewDto = _MAP.Map<YearlyFixedExpensesDto>(entityFromDb);

            return toReturnViewDto;
        }

    }
}