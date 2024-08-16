using System.Threading.Tasks;
using AutoMapper;
using UnitOfWork.Persistence.Operations;
using System.Collections.Generic;
using System;
using Application.Services.Operations.Finances.Dtos;
using Application.Exceptions;
using Microsoft.EntityFrameworkCore;
using Pagination.Models;
using System.Linq;
using System.Net;
using Application.Services.Operations.Finances.Inheritance;
using Application.Services.Operations.Finances.Dtos.CategorySubcategoryExpenses;
using Domain.Entities.Finances.CategorySubcategoryExpenses;
using Domain.Entities.Finances.MonthlyExpenses;

namespace Application.Services.Operations.Finances.MonthlyExpenses
{
    public class MonthFixedExpensesServices : CommonFinancialForServices, IMonthFixedExpensesServices
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

            entityDto.Registered = DateTime.Now;
            entityDto.MonthFixedExpensesTrackings = new List<MonthFixedExpensesTrackingDto>();
            entityDto.MonthFixedExpensesTrackings = AddMonthFixedExpensesTracking(entityDto);

            // if (entityDto.CategoryExpensesId == 0)
            // {
            //     var newCategopryExpenses = new CategoryExpensesDto();
            //     newCategopryExpenses.Id = 0;
            //     newCategopryExpenses.Name = entityDto.NewCategopryExpenses;
            //     newCategopryExpenses.CompanyId = entityDto.CompanyId;
            //     entityDto.CategoryExpenses = newCategopryExpenses;
            // }

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
        public async Task<HttpStatusCode> AddCategoryExpensesAsync(CategoryExpensesDto entityDto)
        {

            if (entityDto == null) throw new Exception(GlobalErrorsMessagesException.ObjIsNull);

            var EntityToDb = _MAP.Map<CategoryExpenses>(entityDto);

            _GENERIC_REPO.CategoriesExpenses.Add(EntityToDb);

            if (await _GENERIC_REPO.save())
            {
                return HttpStatusCode.Created;
            }

            return HttpStatusCode.BadRequest;
        }

        public async Task<bool> CreateMonthFixedExpensesTrackingForNewYear(int companyId)
        {

            var fromDb = await _GENERIC_REPO.MonthFixedExpenses.Get(
                x => x.CompanyId == companyId,
            null
            //    toInclude => toInclude.AsNoTracking().Include(x => x.CategoryExpenses)
                ).AsNoTracking().ToListAsync();


            fromDb.ForEach(x =>
            {
                if (x.Expires.Year < CurrentDate.Year)
                {
                    var domainToDto = _MAP.Map<MonthFixedExpensesDto>(x);
                    x.MonthFixedExpensesTrackings = _MAP.Map<List<MonthFixedExpensesTracking>>(AddMonthFixedExpensesTracking(domainToDto));
                }
            });



            _GENERIC_REPO.MonthFixedExpenses.UpdateRange(fromDb);

            if (await _GENERIC_REPO.save())
            {
                return true;
            }

            return false;
        }

        public async Task<List<MonthFixedExpensesDto>> GetAllAsync(int companyId)
        {
            var fromDb = await _GENERIC_REPO.MonthFixedExpenses.Get(
                predicate => predicate.CompanyId == companyId && predicate.Deleted != true,
                //  toInclude => toInclude.AsNoTracking().Include(x => x.MonthFixedExpensesTrackings)
                 toInclude => toInclude.AsNoTracking().Include(x => x.CategoryExpenses)
                 .Include(x=> x.SubcategoryExpenses),
                selector => selector
                ).AsNoTracking().ToListAsync();

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
                                         toInclude => toInclude.Include(x => x.MonthFixedExpensesTrackings)
                                         .Include(x => x.CategoryExpenses),
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
                .Include(x => x.CategoryExpenses)
                .Include(x => x.MonthFixedExpensesTrackings),
                selector => selector);

            if (entityFromDb == null) throw new GlobalServicesException(GlobalErrorsMessagesException.ObjIsNull);

            var toReturnViewDto = _MAP.Map<MonthFixedExpensesDto>(entityFromDb);

            return toReturnViewDto;
        }

    }
}