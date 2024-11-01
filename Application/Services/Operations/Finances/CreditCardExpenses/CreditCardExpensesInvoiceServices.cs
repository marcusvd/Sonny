using System.Threading.Tasks;
using AutoMapper;
using UnitOfWork.Persistence.Operations;
using System.Collections.Generic;
using System;
using Application.Exceptions;
using System.Net;
using Application.Services.Operations.Finances.Dtos.CreditCardExpenses;
using Domain.Entities.Finances.CreditCardExpenses;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using Application.Services.Operations.Finances.CommonForServices;
using Application.Services.Operations.Finances.Dtos;

namespace Application.Services.Operations.Finances.CreditCardExpenses
{
    public class CreditCardExpensesInvoiceServices : InheritanceForFinancialServices, ICreditCardExpensesInvoiceServices
    {
        private readonly IFinancialObjectMapperServices _IObjectMapperServices;
        private readonly IUnitOfWork _GENERIC_REPO;
        private readonly ICommonForFinancialServices _ICOMMONFORFINANCIALSERVICES;
        public CreditCardExpensesInvoiceServices(
            IUnitOfWork GENERIC_REPO,
            IFinancialObjectMapperServices IObjectMapperServices,
            ICommonForFinancialServices ICOMMONFORFINANCIALSERVICES
            )
        {
            _GENERIC_REPO = GENERIC_REPO;
            _IObjectMapperServices = IObjectMapperServices;
            _ICOMMONFORFINANCIALSERVICES = ICOMMONFORFINANCIALSERVICES;
        }

        public async Task<HttpStatusCode> AddInvoicesAsync(List<CreditCardExpenseInvoiceDto> listInvoices)
        {

            if (listInvoices == null) throw new Exception(GlobalErrorsMessagesException.ObjIsNull);

            var dtoToEntityDb = _IObjectMapperServices.CreditCardExpensesInvoicesListMake(listInvoices);

            _GENERIC_REPO.CreditCardInvoicesExpenses.AddRangeAsync(dtoToEntityDb);

            if (await _GENERIC_REPO.save())
                return HttpStatusCode.Created;

            return HttpStatusCode.BadRequest;
        }
        public async Task<List<CreditCardExpenseInvoiceDto>> GetAllByCardIdAsync(int cardId)
        {
            var fromDb = await _GENERIC_REPO.CreditCardInvoicesExpenses.Get(
                predicate => predicate.CardId == cardId && predicate.Deleted == DateTime.MinValue
                &&
                predicate.CreditCardExpenses.Count != 0,
                toInclude => toInclude.Include(x => x.CreditCardExpenses),
                selector => selector,
                ordeBy => ordeBy.OrderBy(x => x.Expires)
                ).AsNoTracking().ToListAsync();

            if (fromDb == null) throw new Exception(GlobalErrorsMessagesException.ObjIsNull);

            var toViewDto = _IObjectMapperServices.CreditCardExpensesInvoicesListMake(fromDb);

            return toViewDto;

        }
        public async Task<HttpStatusCode> SumCreditCardExpenses(int invoiceId)
        {
            var fromDb = await _GENERIC_REPO.CreditCardInvoicesExpenses.GetById(
                predicate => predicate.Id == invoiceId && predicate.Deleted == DateTime.MinValue,
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
                toInclude => toInclude.Include(x => x.CreditCardExpenses),
                selector => selector
                );

            fromDb.WasPaid = DateTime.Now;
            fromDb.Price += entity.Interest;
            fromDb.Interest = entity.Interest;
            fromDb.PaidFromBankAccountId = entity.PaidFromBankAccountId;

            fromDb.CreditCardExpenses.ForEach(x => x.WasPaid = DateTime.Now);

            var bankBalanceUpdate = await _ICOMMONFORFINANCIALSERVICES.GetBankAccountByIdUpdateBalance(entity.PaidFromBankAccountId ?? 0, fromDb.Price);

            if (bankBalanceUpdate != null)
                _GENERIC_REPO.BankAccounts.Update(bankBalanceUpdate);

            _GENERIC_REPO.CreditCardInvoicesExpenses.Update(fromDb);

            var limitOperation = await _ICOMMONFORFINANCIALSERVICES.CreditCardLimitOperationPaymentUpdateAsync(entity.CardId, entity.UserId, fromDb.Price);
            if (limitOperation != null)

                _GENERIC_REPO.CreditCardLimitOperations.Update(limitOperation);

            var result = await _GENERIC_REPO.save();

            if (result)
                return HttpStatusCode.OK;

            return HttpStatusCode.BadRequest;
        }

      //  public async Task<CreditCardExpenseInvoice> CheckIfExistInvoiceForExpensesExists

    }
}