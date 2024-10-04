using System.Threading.Tasks;
using AutoMapper;
using UnitOfWork.Persistence.Operations;
using System.Collections.Generic;
using System;
using Application.Exceptions;
using System.Net;
using Application.Services.Operations.Finances.Dtos.CreditCardExpenses;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using Domain.Entities.Finances.Bank;
using Application.Services.Operations.Finances.CommonForServices;

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
                predicate => predicate.Id == bankId && predicate.Deleted != true,
                null,
                selector => selector);

            if (fromDb != null)
                fromDb.Balance -= totalPriceInvoice;

            return fromDb;

        }
        public async Task<CreditCardLimitOperation> CreditCardLimitOperationUpdateAsync(int cardId, int userId, decimal pricePaid)
        {
            if (cardId == 0) throw new GlobalServicesException(GlobalErrorsMessagesException.ObjIsNull);

            var fromDb = await _GENERIC_REPO.CreditCardLimitOperations.GetById(
                x => x.CardId == cardId,
                null,
                selector => selector
                );

            fromDb.LimitCreditUsed -= pricePaid;
            fromDb.UserId = userId;
            fromDb.PriceOfLastPayment = pricePaid;
            fromDb.LastPayment = DateTime.UtcNow;

            return fromDb;

        }
      

        // public List<CreditCardExpenseInvoiceDto> CreditCardInvoicesListMakeViaAddCreditCardExpense(CreditCardExpenseDto creditCardExpenseDto)
        // {
        //     if (creditCardExpenseDto == null) throw new Exception(GlobalErrorsMessagesException.ObjIsNull);
        //     var invoicesList = new List<CreditCardExpenseInvoiceDto>();

        //     var startDate = creditCardExpenseDto.Card.ExpiresDate;
        //     var endDate = creditCardExpenseDto.ExpenseDay.AddMonths(creditCardExpenseDto.InstallmentNumber);

        //     for (DateTime begin = startDate; begin < endDate; begin.AddMonths(1))
        //     {
        //         var expires = new DateTime(begin.Year, begin.Month, creditCardExpenseDto.Card.ExpiresDate.Day);
        //         var closingDate = new DateTime(begin.Year, begin.Month, creditCardExpenseDto.Card.ClosingDate.Day);

        //         var creditCardInvoice = new CreditCardExpenseInvoiceDto()
        //         {
        //             UserId = creditCardExpenseDto.UserId ?? 0,
        //             CompanyId = creditCardExpenseDto.CompanyId,
        //             CardId = creditCardExpenseDto.Card.Id,
        //             Price = 0,
        //             Interest = 0,
        //             Expires = expires,
        //             ClosingDate = closingDate,
        //             WasPaid = MinDate,
        //             OthersPaymentMethods = null,
        //             Document = null,
        //             Description = creditCardExpenseDto.Card.Description,
        //             Registered = creditCardExpenseDto.Card.Registered,
        //             Deleted = creditCardExpenseDto.Card.Deleted,
        //         };
        //         invoicesList.Add(creditCardInvoice);
        //     }

        //     return invoicesList;

        // }


    }
}