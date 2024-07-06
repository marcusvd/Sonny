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
    public class YearlyFixedExpensesServices : IYearlyFixedExpensesServices
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
            entityDto.YearlyFixedExpensesTrackings = AddTrackingEntity(entityDto);

            if (entityDto.NameId == 0)
            {
                var newName = new YearlyFixedExpensesFillersDto();
                newName.Id = 0;
                newName.ExpensesName = entityDto.NameNew;
                newName.CompanyId = entityDto.CompanyId;
                entityDto.Name = newName;
            }

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
        public async Task<HttpStatusCode> AddYearlyFixedExpensesFillersAsync(YearlyFixedExpensesFillersDto entityDto)
        {

            if (entityDto == null) throw new Exception(GlobalErrorsMessagesException.ObjIsNull);

            var EntityToDb = _MAP.Map<YearlyFixedExpensesFillers>(entityDto);

            _GENERIC_REPO.YearlyFixedExpensesFillers.Add(EntityToDb);

            if (await _GENERIC_REPO.save())
            {
                return HttpStatusCode.Created;
            }

            return HttpStatusCode.BadRequest;
        }
        public List<YearlyFixedExpensesTrackingDto> AddTrackingEntity(YearlyFixedExpensesDto YearlyFixedExpenses)
        {

            var today = DateTime.Now;

            var tranckings = new List<YearlyFixedExpensesTrackingDto>();

            YearlyFixedExpensesTrackingDto trancking;
            DateTime expirationDate;

            for (int n = today.Month; n <= 12; n++)
            {
                trancking = new YearlyFixedExpensesTrackingDto();
                expirationDate = new DateTime(today.Year, n, YearlyFixedExpenses.Expiration.Day);
                trancking.CompanyId = YearlyFixedExpenses.CompanyId;
                trancking.UserId = YearlyFixedExpenses.UserId;
                trancking.BankAccountId = null;
                trancking.PixId = null;
                trancking.CardId = null;
                trancking.OthersPaymentMethods = null;
                trancking.WasPaid = DateTime.MinValue;
                trancking.Expiration = expirationDate;
                trancking.Registered = DateTime.Now;
                trancking.Price = YearlyFixedExpenses.Price;
                trancking.Interest = 0;
                tranckings.Add(trancking);
            }

            return tranckings;
        }
        public async Task<List<YearlyFixedExpensesDto>> GetAllAsync(int companyId)
        {
            var fromDb = await _GENERIC_REPO.YearlyFixedExpenses.Get(
                predicate => predicate.CompanyId == companyId && predicate.Deleted != true,
                 toInclude => toInclude.Include(x => x.YearlyFixedExpensesTrackings)
                 .Include(x => x.Name),
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
                                         .Include(x => x.Name),
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
                .Include(x => x.Name)
                .Include(x => x.YearlyFixedExpensesTrackings),
                selector => selector);

            if (entityFromDb == null) throw new GlobalServicesException(GlobalErrorsMessagesException.ObjIsNull);

            var toReturnViewDto = _MAP.Map<YearlyFixedExpensesDto>(entityFromDb);

            return toReturnViewDto;
        }

    }
}