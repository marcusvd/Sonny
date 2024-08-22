using System.Threading.Tasks;
using AutoMapper;
using UnitOfWork.Persistence.Operations;
using System.Collections.Generic;
using System;
using Application.Exceptions;
using Microsoft.EntityFrameworkCore;
using Pagination.Models;
using System.Linq;
using Application.Services.Operations.Finances.Inheritance;
using Application.Services.Operations.Finances.FinancingsLoansExpenses;
using Application.Services.Operations.Finances.Dtos.FinancingsLoansExpenses;
using Domain.Entities.Finances.FinancingsLoansExpenses;


namespace Application.Services.Operations.Finances.FinancingLoansExpenses.FinancingLoansExpenses
{
    public class FinancingsAndLoansExpensesServices : CommonFinancialForServices, IFinancingsAndLoansExpensesServices
    {
        private readonly IMapper _MAP;
        private readonly IUnitOfWork _GENERIC_REPO;
        public FinancingsAndLoansExpensesServices(
            IUnitOfWork GENERIC_REPO,
            IMapper MAP
            )
        {
            _GENERIC_REPO = GENERIC_REPO;
            _MAP = MAP;
        }
        public async Task<FinancingAndLoanExpenseDto> AddAsync(FinancingAndLoanExpenseDto entityDto)
        {

            if (entityDto == null) throw new Exception(GlobalErrorsMessagesException.ObjIsNull);

            entityDto.Registered = DateTime.Now;
            entityDto.FinancingAndLoansExpensesTrackings = new List<FinancingAndLoanExpenseTrackingDto>();
            entityDto.FinancingAndLoansExpensesTrackings = FinancingLoansExpensesTrackings(entityDto);

            var EntityToDb = _MAP.Map<FinancingAndLoanExpense>(entityDto);

            _GENERIC_REPO.FinancingsAndLoansExpenses.Add(EntityToDb);

            if (await _GENERIC_REPO.save())
            {
                FinancingAndLoanExpense EntityFromDb = await _GENERIC_REPO.FinancingsAndLoansExpenses.GetById(
                    _id => _id.Id == EntityToDb.Id,
                    null,
                    selector => selector
                    );

                return _MAP.Map<FinancingAndLoanExpenseDto>(EntityFromDb);
            }

            return entityDto;
        }
        public async Task<List<FinancingAndLoanExpenseDto>> GetAllAsync(int companyId)
        {
            var fromDb = await _GENERIC_REPO.FinancingsAndLoansExpenses.Get(
                predicate => predicate.CompanyId == companyId && predicate.Deleted != true,
                 //  toInclude => toInclude.Include(x => x.YearlyFixedExpensesTrackings)
                 toInclude => toInclude.Include(x => x.CategoryExpense)
                 .Include(x => x.SubcategoryExpense),
                selector => selector
                ).ToListAsync();

            if (fromDb == null) throw new Exception(GlobalErrorsMessagesException.ObjIsNull);

            var toViewDto = _MAP.Map<List<FinancingAndLoanExpenseDto>>(fromDb);

            return toViewDto;

        }
        public async Task<PagedList<FinancingAndLoanExpenseDto>> GetAllPagedAsync(Params parameters)
        {
            Func<IQueryable<FinancingAndLoanExpense>, IOrderedQueryable<FinancingAndLoanExpense>> orderBy = null;

            var fromDb = await _GENERIC_REPO.FinancingsAndLoansExpenses.GetPaged(
              parameters,
                                         predicate => predicate.Id == parameters.predicate && predicate.Deleted != true,
                                         toInclude => 
                                         toInclude.Include(x => x.FinancingsAndLoansExpensesTrackings)
                                         .Include(x => x.CategoryExpense),
                                         selector => selector,
                                         orderBy,
                                         null
                );

            if (fromDb == null) throw new GlobalServicesException(GlobalErrorsMessagesException.ObjIsNull);

            var ViewDto = _MAP.Map<List<FinancingAndLoanExpenseDto>>(fromDb);

            var PgDto = new PagedList<FinancingAndLoanExpenseDto>()
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
        public async Task<FinancingAndLoanExpenseDto> GetByIdAllIncluded(int yearlyFixedExpensesId)
        {

            var entityFromDb = await _GENERIC_REPO.YearlyFixedExpenses.GetById(
                 predicate => predicate.Id == yearlyFixedExpensesId && predicate.Deleted != true,
                toInclude =>
                toInclude
                .Include(x => x.CategoryExpense)
                .Include(x => x.YearlyFixedExpensesTrackings),
                selector => selector);

            if (entityFromDb == null) throw new GlobalServicesException(GlobalErrorsMessagesException.ObjIsNull);

            var toReturnViewDto = _MAP.Map<FinancingAndLoanExpenseDto>(entityFromDb);

            return toReturnViewDto;
        }

    }
}