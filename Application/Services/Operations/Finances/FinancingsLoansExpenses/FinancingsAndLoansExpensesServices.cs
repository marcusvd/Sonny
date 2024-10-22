using System.Threading.Tasks;
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
using System.Net;
using Application.Services.Operations.Finances.CommonForServices;
using Application.Services.Operations.Finances.Dtos;


namespace Application.Services.Operations.Finances.FinancingLoansExpenses.FinancingLoansExpenses
{
    public class FinancingsAndLoansExpensesServices : InheritanceFinancingsLoansExpensesServices, IFinancingsAndLoansExpensesServices
    {
        private readonly IUnitOfWork _GENERIC_REPO;
        private readonly ICommonForFinancialServices _ICOMMONFORFINANCIALSERVICES;
        private readonly IFinancialObjectMapperServices _IObjectMapperServices;
        public FinancingsAndLoansExpensesServices(
            IUnitOfWork GENERIC_REPO,
            ICommonForFinancialServices ICOMMONFORFINANCIALSERVICES,
            IFinancialObjectMapperServices IObjectMapperServices
            )
        {

            _GENERIC_REPO = GENERIC_REPO;
            _ICOMMONFORFINANCIALSERVICES = ICOMMONFORFINANCIALSERVICES;
            _IObjectMapperServices = IObjectMapperServices;
        }
        public async Task<HttpStatusCode> AddRangeAsync(FinancingAndLoanExpenseDto entityDto)
        {
            if (entityDto == null) throw new Exception(GlobalErrorsMessagesException.ObjIsNull);

            entityDto.Registered = DateTime.Now;

            var FinancingLoanExpenseAndInstallemnts = FinancingLoansExpensesListMake(_IObjectMapperServices.FinancingAndLoanExpenseMapper(entityDto));

            _GENERIC_REPO.FinancingsAndLoansExpenses.Add(FinancingLoanExpenseAndInstallemnts);

            if (await _GENERIC_REPO.save())
                return HttpStatusCode.Created;

            return HttpStatusCode.BadRequest;
        }
        public async Task<List<FinancingAndLoanExpenseDto>> GetAllAsync(int companyId)
        {
            var fromDb = await _GENERIC_REPO.FinancingsAndLoansExpenses.Get(
                predicate => predicate.CompanyId == companyId && predicate.Deleted != true,
                 toInclude => toInclude.Include(x => x.CategoryExpense),
                selector => selector
                ).ToListAsync();

            if (fromDb == null) throw new Exception(GlobalErrorsMessagesException.ObjIsNull);

            var toViewDto = _IObjectMapperServices.FinancingAndLoanExpenseListMake(fromDb);

            return toViewDto;
        }
        public async Task<List<FinancingAndLoanExpenseInstallmentDto>> GetAllInstallmentAsync(int companyId)
        {
            var fromDb = await _GENERIC_REPO.FinancingsAndLoansExpensesInstallments.Get(
                predicate => predicate.CompanyId == companyId && predicate.Deleted != true,
                 toInclude => toInclude.Include(x => x.FinancingAndLoanExpense)
                 ,
                selector => selector
                ).ToListAsync();

            if (fromDb == null) throw new Exception(GlobalErrorsMessagesException.ObjIsNull);

            var toViewDto = _IObjectMapperServices.FinancingAndLoanExpenseInstallmentListMake(fromDb);

            return toViewDto;

        }
        public async Task<List<FinancingAndLoanExpenseInstallmentDto>> GetInstallmentsByFinancingsAndLoansExpensesIdAsync(int financingAndLoanExpenseId)
        {
            var fromDb = await _GENERIC_REPO.FinancingsAndLoansExpensesInstallments.Get(
                predicate => predicate.FinancingAndLoanExpenseId == financingAndLoanExpenseId && predicate.Deleted != true,
                 toInclude => toInclude.Include(x => x.FinancingAndLoanExpense)
                 .ThenInclude(x => x.CategoryExpense)
                 .Include(x => x.FinancingAndLoanExpense)
                 .ThenInclude(x => x.SubcategoryExpense),
                selector => selector,
                  ordeBy => ordeBy.OrderBy(x => x.Expires)
                ).ToListAsync();

            if (fromDb == null) throw new Exception(GlobalErrorsMessagesException.ObjIsNull);

            var toViewDto = _IObjectMapperServices.FinancingAndLoanExpenseInstallmentListMake(fromDb);

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

            var ViewDto = _IObjectMapperServices.FinancingAndLoanExpenseListMake(fromDb);

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
                .Include(x => x.User),
                     selector => selector);

            if (entityFromDb == null) throw new GlobalServicesException(GlobalErrorsMessagesException.ObjIsNull);

            var toReturnViewDto = _IObjectMapperServices.FinancingAndLoanExpenseMapper(entityFromDb);

            return toReturnViewDto;
        }
        public async Task<HttpStatusCode> UpdateAsync(int financingAndLoanId, FinancingAndLoanExpenseInstallmentPaymentDto entity)
        {
            if (entity == null) throw new GlobalServicesException(GlobalErrorsMessagesException.ObjIsNull);
            if (financingAndLoanId != entity.Id) throw new GlobalServicesException(GlobalErrorsMessagesException.IdIsDifferentFromEntityUpdate);

            var fromDb = await _GENERIC_REPO.FinancingsAndLoansExpensesInstallments.GetById(
                x => x.Id == financingAndLoanId,
                toInclude => toInclude.Include(x => x.FinancingAndLoanExpense),
                selector => selector
                );

            var updated = _IObjectMapperServices.InstallmentPayment(entity, fromDb);

            updated.WasPaid = DateTime.Now;
            updated.PriceWasPaidInstallment += updated.Interest;

            if (entity.PixId != null)
                _GENERIC_REPO.PixesExpenses.Add(CheckSourcePix(updated, entity.Id, "financingloans", entity.PixExpense));

            var bankBalanceUpdate = await _ICOMMONFORFINANCIALSERVICES.GetBankAccountByIdUpdateBalance(updated.BankAccountId ?? 0, updated.PriceWasPaidInstallment);
            if (bankBalanceUpdate != null)
                _GENERIC_REPO.BankAccounts.Update(bankBalanceUpdate);

            var paidOff = await _ICOMMONFORFINANCIALSERVICES.FinancingPaidOff(updated.FinancingAndLoanExpenseId);

            if (paidOff != null)
                updated.FinancingAndLoanExpense = paidOff;


            _GENERIC_REPO.FinancingsAndLoansExpensesInstallments.Update(updated);


            if (await _GENERIC_REPO.save())
                return HttpStatusCode.OK;

            return HttpStatusCode.BadRequest;
        }
    }
}