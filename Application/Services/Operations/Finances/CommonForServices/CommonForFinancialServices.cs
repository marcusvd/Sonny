using System.Threading.Tasks;
using AutoMapper;
using UnitOfWork.Persistence.Operations;
using System;
using Application.Exceptions;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using Domain.Entities.Finances.Bank;
using Domain.Entities.Finances.FinancingsLoansExpenses;
using Domain.Entities.Finances.Enums;

namespace Application.Services.Operations.Finances.CommonForServices
{
    public class CommonForFinancialServices : InheritanceForFinancialServices, ICommonForFinancialServices
    {
        private readonly IMapper _MAP;
        private readonly IUnitOfWork _GENERIC_REPO;
        public CommonForFinancialServices(
            IUnitOfWork GENERIC_REPO,
            IMapper MAP
            )
        {
            _GENERIC_REPO = GENERIC_REPO;
            _MAP = MAP;
        }
        public async Task<BankAccount> GetBankAccountByIdUpdateBalance(int bankId, decimal totalPriceInvoice)
        {

            var fromDb = await _GENERIC_REPO.BankAccounts.GetById(
                predicate => predicate.Id == bankId && predicate.Deleted == DateTime.MinValue,
                null,
                selector => selector);

            if (fromDb != null)
                fromDb.Balance -= totalPriceInvoice;

            return fromDb;

        }
        public async Task<CreditCardLimitOperation> CreditCardLimitOperationPaymentUpdateAsync(int id, int userId, decimal pricePaid)
        {
            if (id == 0) throw new GlobalServicesException(GlobalErrorsMessagesException.ObjIsNull);

            var fromDb = await _GENERIC_REPO.CreditCardLimitOperations.GetById(
                x => x.Id == id,
                null,
                selector => selector
                );

            fromDb.LimitCreditUsed -= pricePaid;
            fromDb.UserId = userId;
            fromDb.PriceOfLastPayment = pricePaid;
            fromDb.LastPayment = DateTime.Now;

            return fromDb;

        }
        public async Task<CreditCardLimitOperation> CreditCardLimitOperationNewExpenseAsync(int id, int userId, decimal pricePaid)
        {
            if (id == 0) throw new GlobalServicesException(GlobalErrorsMessagesException.ObjIsNull);

            var fromDb = await _GENERIC_REPO.CreditCardLimitOperations.GetById(
                x => x.Id == id,
                null,
                selector => selector
                );

            fromDb.LimitCreditUsed += pricePaid;
            fromDb.UserId = userId;

            return fromDb;
        }
        public async Task<FinancingAndLoanExpense> FinancingPaidOff(int financingAndLoanId)
        {
            if (financingAndLoanId == 0) throw new GlobalServicesException(GlobalErrorsMessagesException.ObjIsNull);

            var fromDb = await _GENERIC_REPO.FinancingsAndLoansExpenses.GetById(
                x => x.Id == financingAndLoanId,
                toInclude => toInclude.Include(x => x.FinancingsAndLoansExpensesInstallments),
                selector => selector
                );

            var result = fromDb.FinancingsAndLoansExpensesInstallments.ToList().Where(x => x.WasPaid == DateTime.MinValue).ToList();

            if (result.Count == 1)
            {
                fromDb.WasPaid = DateTime.Now;
                fromDb.FinancingsAndLoansExpensesInstallments = null;
                return fromDb;
            }

            return null;
        }

        public async Task<Card> CheckDebitOrCredit(int id)
        {
            if (id == 0) return null;

            var card = await _GENERIC_REPO.CreditCards.GetById(
                predicate => predicate.Id == id,
               toInclude => toInclude.Include(x => x.CreditCardLimitOperation),
                selector => selector
                );


            if (card.Type == TypeCardEnum.Debit) return null;

            return card;
        }




    }
}