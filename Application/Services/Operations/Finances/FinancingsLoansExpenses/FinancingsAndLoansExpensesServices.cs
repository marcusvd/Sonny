using System.Threading.Tasks;
using AutoMapper;
using UnitOfWork.Persistence.Operations;
using System.Collections.Generic;
using System;
using Application.Exceptions;
using Microsoft.EntityFrameworkCore;
using Pagination.Models;
using System.Linq;
using Application.Services.Operations.Finances.FinancingsLoansExpenses;
using Application.Services.Operations.Finances.Dtos.FinancingsLoansExpenses;
using Domain.Entities.Finances.FinancingsLoansExpenses;
using Application.Services.Operations.Finances.InheritanceServices;
using System.Net;


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
                 //  toInclude => toInclude.Include(x => x.financingAndLoanTrackings)
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
                                         toInclude.Include(x => x.CategoryExpense),
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
        public async Task<FinancingAndLoanExpenseDto> GetByIdAllIncluded(int financingAndLoanId)
        {

            var entityFromDb = await _GENERIC_REPO.FinancingsAndLoansExpenses.GetById(
                 predicate => predicate.Id == financingAndLoanId && predicate.Deleted != true,
                toInclude =>
                toInclude
                .Include(x => x.CategoryExpense)
                .Include(x => x.SubcategoryExpense)
                .Include(x => x.User)
                .Include(x => x.BankAccount)
                .Include(x => x.Card)
                .Include(x => x.Pix),
                selector => selector);

            if (entityFromDb == null) throw new GlobalServicesException(GlobalErrorsMessagesException.ObjIsNull);

            var toReturnViewDto = _MAP.Map<FinancingAndLoanExpenseDto>(entityFromDb);

            return toReturnViewDto;
        }



        public async Task<HttpStatusCode> UpdateAsync(int financingAndLoanId, FinancingAndLoanExpenseDto entity)
        {
            if (entity == null) throw new GlobalServicesException(GlobalErrorsMessagesException.ObjIsNull);
            if (financingAndLoanId != entity.Id) throw new GlobalServicesException(GlobalErrorsMessagesException.IdIsDifferentFromEntityUpdate);

            var fromDb = await _GENERIC_REPO.FinancingsAndLoansExpenses.GetById(
                x => x.Id == financingAndLoanId,
                null,
                selector => selector
                );

            var updated = _MAP.Map(entity, fromDb);
            updated.WasPaid = DateTime.Now;

            _GENERIC_REPO.FinancingsAndLoansExpenses.Update(updated);

            var result = await _GENERIC_REPO.save();

            if (result)
                return HttpStatusCode.OK;

            return HttpStatusCode.BadRequest;
        }


    }
}