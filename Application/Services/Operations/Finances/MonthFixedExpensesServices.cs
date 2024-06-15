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
using System.Net;

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

            entityDto.Registered = DateTime.Now;
            entityDto.MonthFixedExpensesTrackings = new List<MonthFixedExpensesTrackingDto>();
            entityDto.MonthFixedExpensesTrackings.Add(AddTrackingEntity(entityDto));

            if (entityDto.NameId == 0)
            {
                var newName = new MonthFixedExpensesFillersDto();
                newName.Id = 0;
                newName.ExpensesName = entityDto.NameNew;
                newName.CompanyId = entityDto.CompanyId;
                entityDto.Name = newName;
            }
            
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
        public async Task<HttpStatusCode> AddMonthFixedExpensesFillersAsync(MonthFixedExpensesFillersDto entityDto)
        {

            if (entityDto == null) throw new Exception(GlobalErrorsMessagesException.ObjIsNull);

            var EntityToDb = _MAP.Map<MonthFixedExpensesFillers>(entityDto);

            _GENERIC_REPO.MonthFixedExpensesFillers.Add(EntityToDb);

            if (await _GENERIC_REPO.save())
            {
                return HttpStatusCode.Created;
            }

            return HttpStatusCode.BadRequest;
        }


        public MonthFixedExpensesTrackingDto AddTrackingEntity(MonthFixedExpensesDto monthFixedExpenses)
        {

            var trancking = new MonthFixedExpensesTrackingDto();

            trancking.CompanyId = monthFixedExpenses.CompanyId;
            trancking.UserId = monthFixedExpenses.UserId;
            trancking.BankAccountId = null;
            trancking.PixId = null;
            trancking.CardId = null;
            trancking.OthersPaymentMethods = null;
            trancking.WasPaid = DateTime.MinValue;
            trancking.Expiration = monthFixedExpenses.Expiration;
            trancking.Registered = DateTime.Now;
            trancking.Price = monthFixedExpenses.Price;
            trancking.Interest = 0;

            return trancking;
        }





        public async Task<List<MonthFixedExpensesDto>> GetAllAsync(int companyId)
        {
            var fromDb = await _GENERIC_REPO.MonthFixedExpenses.Get(
                predicate => predicate.CompanyId == companyId && predicate.Deleted != true,
                 toInclude => toInclude.Include(x => x.MonthFixedExpensesTrackings)
                 .Include(x => x.Name),
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
                                         toInclude => toInclude.Include(x => x.MonthFixedExpensesTrackings)
                                         .Include(x => x.Name),
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
                .Include(x => x.Name)
                .Include(x => x.MonthFixedExpensesTrackings),
                selector => selector);

            if (entityFromDb == null) throw new GlobalServicesException(GlobalErrorsMessagesException.ObjIsNull);

            var toReturnViewDto = _MAP.Map<MonthFixedExpensesDto>(entityFromDb);

            return toReturnViewDto;
        }

    }
}