using System.Threading.Tasks;
using AutoMapper;
using UnitOfWork.Persistence.Operations;
using System.Collections.Generic;
using System;
using Application.Exceptions;
using System.Net;
using Application.Services.Operations.Finances.InheritanceServices;
using Application.Services.Operations.Finances.Dtos.CreditCardExpenses;
using Domain.Entities.Finances.CreditCardExpenses;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using Domain.Entities.Finances.Bank;
using Application.Services.Operations.Finances.Dtos.Bank;

namespace Application.Services.Operations.Finances.CreditCardExpenses
{
    public class CreditCardExpensesInvoiceServices : CommonFinancialForServices, ICreditCardExpensesInvoiceServices
    {
        private readonly IMapper _MAP;
        private readonly IUnitOfWork _GENERIC_REPO;
        public CreditCardExpensesInvoiceServices(
            IUnitOfWork GENERIC_REPO,
            IMapper MAP
            )
        {
            _GENERIC_REPO = GENERIC_REPO;
            _MAP = MAP;
        }

        public async Task<List<CreditCardExpenseInvoiceDto>> GetAllByCardIdAsync(int cardId)
        {
            var fromDb = await _GENERIC_REPO.CreditCardInvoicesExpenses.Get(
                predicate => predicate.CardId == cardId && predicate.Deleted != true
                &&
                predicate.CreditCardExpenses.Count != 0,
                toInclude => toInclude.Include(x => x.CreditCardExpenses),
                selector => selector,
                ordeBy => ordeBy.OrderBy(x => x.Expires)
                ).AsNoTracking().ToListAsync();

            if (fromDb == null) throw new Exception(GlobalErrorsMessagesException.ObjIsNull);

            var toViewDto = _MAP.Map<List<CreditCardExpenseInvoiceDto>>(fromDb);

            return toViewDto;

        }

        public async Task<HttpStatusCode> SumCreditCardExpenses(int invoiceId)
        {
            var fromDb = await _GENERIC_REPO.CreditCardInvoicesExpenses.GetById(
                predicate => predicate.Id == invoiceId && predicate.Deleted != true,
                toInclude => toInclude.Include(x => x.CreditCardExpenses),
                selector => selector
                );

            var result = fromDb.CreditCardExpenses.Sum(x => x.InstallmentPrice);

            if (fromDb.Price != result)
                fromDb.Price = result;

            _GENERIC_REPO.CreditCardInvoicesExpenses.Update(fromDb);


            if (await _GENERIC_REPO.save())
                return HttpStatusCode.OK;

            return HttpStatusCode.BadRequest;

        }


        public async Task<HttpStatusCode> UpdateAsync(int invoiceId, CreditCardExpenseInvoiceDto entity)
        {
            if (entity == null) throw new GlobalServicesException(GlobalErrorsMessagesException.ObjIsNull);
            if (invoiceId != entity.Id) throw new GlobalServicesException(GlobalErrorsMessagesException.IdIsDifferentFromEntityUpdate);

            var fromDb = await _GENERIC_REPO.CreditCardInvoicesExpenses.GetById(
                x => x.Id == invoiceId,
                null,
                selector => selector
                );

            fromDb.WasPaid = DateTime.Now;

            fromDb.UserId = entity.UserId;
            fromDb.CardId = entity.CardId;
            fromDb.WasPaid = entity.WasPaid;
            fromDb.Price = entity.Price;
            fromDb.Interest = entity.Interest;

            var bankBalanceUpdate = await GetBankAccountByIdUpdateBalance(entity.BankAccountId, fromDb.Price, entity.Interest);

            if (bankBalanceUpdate != null)
                _GENERIC_REPO.BankAccounts.Update(bankBalanceUpdate);

            _GENERIC_REPO.CreditCardInvoicesExpenses.Update(fromDb);

            var limitOperation = await CreditCardLimitOperationUpdateAsync(entity.CardId, entity.UserId, entity.Price + entity.Interest);
            if (limitOperation != null)

                _GENERIC_REPO.CreditCardLimitOperations.Update(limitOperation);

            var result = await _GENERIC_REPO.save();

            if (result)
                return HttpStatusCode.OK;

            return HttpStatusCode.BadRequest;
        }

        private async Task<BankAccount> GetBankAccountByIdUpdateBalance(int bankId, decimal totalPriceInvoice, decimal interest)
        {

            var fromDb = await _GENERIC_REPO.BankAccounts.GetById(
                predicate => predicate.Id == bankId && predicate.Deleted != true,
                null,
                selector => selector);

            totalPriceInvoice += interest;

            if (fromDb != null)
                fromDb.Balance -= totalPriceInvoice;

            return fromDb;

        }

        private async Task<CreditCardLimitOperation> CreditCardLimitOperationUpdateAsync(int cardId, int userId, decimal pricePaid)
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
    }
}