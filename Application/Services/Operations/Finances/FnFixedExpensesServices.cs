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
    public class FnFixedExpensesServices : IFnFixedExpensesServices
    {
        private readonly IMapper _MAP;
        private readonly IUnitOfWork _GENERIC_REPO;
        public FnFixedExpensesServices(
            IUnitOfWork GENERIC_REPO,
            IMapper MAP
            )
        {
            _GENERIC_REPO = GENERIC_REPO;
            _MAP = MAP;
        }
        public async Task<FixedExpensesDto> AddAsync(FixedExpensesDto entityDto)
        {

            if (entityDto == null) throw new Exception(GlobalErrorsMessagesException.ObjIsNull);

            // FinancesAddBusinessRulesValidation.ExpirationGreaterThanCurrentDate(entityDto);

            entityDto.Registered = DateTime.Now;

            var EntityToDb = _MAP.Map<FixedExpenses>(entityDto);

            _GENERIC_REPO.FixedExpenses.Add(EntityToDb);

            if (await _GENERIC_REPO.save())
            {
                FixedExpenses EntityFromDb = await _GENERIC_REPO.FixedExpenses.GetById(
                    _id => _id.Id == EntityToDb.Id,
                    null,
                    selector => selector
                    );

                return _MAP.Map<FixedExpensesDto>(EntityFromDb);
            }

            return entityDto;
        }

        public async Task<List<FixedExpensesDto>> GetAllAsync(int companyId)
        {
            var fromDb = await _GENERIC_REPO.FixedExpenses.Get(
                predicate => predicate.CompanyId == companyId && predicate.Deleted != true,
                 toInclude => toInclude.Include(x => x.FixedExpensesTrackings),
                selector => selector
                ).ToListAsync();

            if (fromDb == null) throw new Exception(GlobalErrorsMessagesException.ObjIsNull);

            var toViewDto = _MAP.Map<List<FixedExpensesDto>>(fromDb);

            return toViewDto;

        }

        public async Task<PagedList<FixedExpensesDto>> GetAllPagedAsync(Params parameters)
        {
            Func<IQueryable<FixedExpenses>, IOrderedQueryable<FixedExpenses>> orderBy = null;

            var fromDb = await _GENERIC_REPO.FixedExpenses.GetPaged(
              parameters,
                                         predicate => predicate.Id == parameters.predicate && predicate.Deleted != true,
                                         toInclude => toInclude.Include(x => x.FixedExpensesTrackings),
                                         selector => selector,
                                         orderBy,
                                         null
                );

            if (fromDb == null) throw new GlobalServicesException(GlobalErrorsMessagesException.ObjIsNull);

            var ViewDto = _MAP.Map<List<FixedExpensesDto>>(fromDb);

            var PgDto = new PagedList<FixedExpensesDto>()
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


        public async Task<FixedExpensesDto> GetByIdAllIncluded(int fixedExpensesId)
        {

            var entityFromDb = await _GENERIC_REPO.FixedExpenses.GetById(
                 predicate => predicate.Id == fixedExpensesId && predicate.Deleted != true,
                toInclude =>
                toInclude
                .Include(x => x.FixedExpensesTrackings),
                selector => selector);

            if (entityFromDb == null) throw new GlobalServicesException(GlobalErrorsMessagesException.ObjIsNull);

            var toReturnViewDto = _MAP.Map<FixedExpensesDto>(entityFromDb);

            return toReturnViewDto;
        }

    }
}