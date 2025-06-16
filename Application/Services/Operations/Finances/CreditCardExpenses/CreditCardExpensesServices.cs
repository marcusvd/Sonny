using System.Threading.Tasks;
using UnitOfWork.Persistence.Operations;
using System.Collections.Generic;
using System;
using Application.Exceptions;
using System.Net;
using Application.Services.Operations.Finances.Dtos.CreditCardExpenses;
using Microsoft.EntityFrameworkCore;
using Application.Services.Operations.Finances.Dtos.Bank;
using Application.Services.Operations.Finances.CommonForServices;
using Application.Services.Operations.Finances.Helpers.CreditCardExpenses;
using Domain.Entities.Finances.CreditCardExpenses;
using Application.Services.Operations.Finances.Dtos;
using System.Linq;

namespace Application.Services.Operations.Finances.CreditCardExpenses
{
    public class CreditCardExpensesServices : InheritanceExpensesAndInvoices, ICreditCardExpensesServices
    {
        private readonly IFinancialObjectMapperServices _IObjectMapperServices;
        private readonly IUnitOfWork _GENERIC_REPO;
        private readonly ICommonForFinancialServices _ICOMMONFORFINANCIALSERVICES;
        private readonly ICreditCardExpensesInvoiceServices _ICREDITCARDEXPENSESINVOICESERVICES;
        public CreditCardExpensesServices(
            IUnitOfWork GENERIC_REPO,
            IFinancialObjectMapperServices IObjectMapperServices,
            ICommonForFinancialServices ICOMMONFORFINANCIALSERVICES,
            ICreditCardExpensesInvoiceServices ICREDITCARDEXPENSESINVOICESERVICES
            )
        {
            _GENERIC_REPO = GENERIC_REPO;
            _IObjectMapperServices = IObjectMapperServices;
            _ICOMMONFORFINANCIALSERVICES = ICOMMONFORFINANCIALSERVICES;
            _ICREDITCARDEXPENSESINVOICESERVICES = ICREDITCARDEXPENSESINVOICESERVICES;
        }

        public async Task<HttpStatusCode> AddCreditCardExpenseAsync(CreditCardExpenseDto entityDto)
        {

            if (entityDto == null) throw new Exception(GlobalErrorsMessagesException.ObjIsNull);

            entityDto.Registered = DateTime.Now;
            entityDto.CreditCardLimitOperation.LimitCreditUsed += entityDto.Price;

            var fromDb = await GetInvoicesFromDb(entityDto.CardId);

            var toDb = CreditCardExpensesInstallmentListMake(entityDto);

            var installmentWithoutInvoice = ReturnInstallmentsWithoutInvoice(fromDb, toDb);

            var withInvoicesAssosiated = ReturnInstallmentsWithInvoice(fromDb, toDb);

            if (installmentWithoutInvoice.Count > 0)
                await _ICREDITCARDEXPENSESINVOICESERVICES.AddInvoicesAsync(installmentWithoutInvoice);

            _GENERIC_REPO.CreditCardExpenses.AddRangeAsync(_IObjectMapperServices.CreditCardExpensesListMake(withInvoicesAssosiated.CreditCardExpenses));
            _GENERIC_REPO.CreditCardInvoicesExpenses.UpdateRange(fromDb);

            var limitOperation = await _ICOMMONFORFINANCIALSERVICES.CreditCardLimitOperationNewExpenseAsync(entityDto.CreditCardLimitOperation.Id, entityDto.CreditCardLimitOperation.UserId, entityDto.Price);

            _GENERIC_REPO.CreditCardLimitOperations.Update(limitOperation);

            if (await _GENERIC_REPO.save())
                return HttpStatusCode.Created;

            return HttpStatusCode.BadRequest;
        }
        public async Task<HttpStatusCode> AddCreditCardExpenseFromOtherSourcesAsync(CreditCardExpenseDto entity)
        {
            if (entity == null) throw new Exception(GlobalErrorsMessagesException.ObjIsNull);

            entity.Registered = DateTime.Now;

            var fromDb = await GetSingleInvoiceFromDb(entity.CardId, entity.Expires);
            
            var card = entity.Card;

            if (fromDb != null)
            {
                entity.Card = null;
                fromDb.CreditCardExpenses = new() { _IObjectMapperServices.CreditCardExpenseMapper(entity) };
                fromDb.Interest += entity.TotalPriceInterest;
                fromDb.Price += entity.InstallmentPrice;

                _GENERIC_REPO.CreditCardInvoicesExpenses.Update(fromDb);
            }
            else
            {
                var creditCardExpenseInvoice = new CreditCardExpenseInvoice()
                {
                    Id = 0,
                    UserId = entity.UserId,
                    CompanyId = entity.CompanyId,
                    CardId = entity.CardId,
                    Price = entity.InstallmentPrice,
                    Interest = entity.TotalPriceInterest,
                    PaidFromBankAccountId = null,
                    Expires = entity.Expires,
                    ClosingDate = new DateTime(entity.Expires.Year, entity.Expires.Month, entity.Card.ClosingDate.Day),
                    WasPaid = MinDate,
                    OthersPaymentMethods = null,
                    Document = null,
                    Description = entity.Card.Description,
                    Registered = DateTime.Now,
                    CreditCardExpenses = new(),
                    Deleted = DateTime.MinValue,
                };

                entity.Card = null;

                creditCardExpenseInvoice.CreditCardExpenses.Add(_IObjectMapperServices.CreditCardExpenseMapper(entity));

                _GENERIC_REPO.CreditCardInvoicesExpenses.Add(creditCardExpenseInvoice);
            }

            var limitOperation = await _ICOMMONFORFINANCIALSERVICES.CreditCardLimitOperationNewExpenseAsync(card.CreditCardLimitOperation.Id, card.CreditCardLimitOperation.UserId, entity.InstallmentPrice);
            _GENERIC_REPO.CreditCardLimitOperations.Update(limitOperation);


            if (await _GENERIC_REPO.save())
                return HttpStatusCode.Created;

            return HttpStatusCode.BadRequest;
        }


        private async Task<List<CreditCardExpenseInvoice>> GetInvoicesFromDb(int cardId)
        {
            var fromDb = await _GENERIC_REPO.CreditCardInvoicesExpenses.Get(
                  predicate => predicate.CardId == cardId
                   && predicate.Deleted == DateTime.MinValue,
                  null,
                   selector => selector
                  ).ToListAsync();

            return fromDb;
        }
        private async Task<CreditCardExpenseInvoice> GetSingleInvoiceFromDb(int cardId, DateTime expenseExpires)

        {
            var fromDb = await _GENERIC_REPO.CreditCardInvoicesExpenses.Get(
                  predicate => predicate.CardId == cardId
                   && predicate.Deleted == DateTime.MinValue,
                  null,
                   selector => selector
                  ).ToListAsync();


            var invoiceReturn = fromDb.Where(x => x.Expires.Date == expenseExpires.Date && x.WasPaid == MinDate).FirstOrDefault();

            return invoiceReturn;
        }
        public async Task<List<CreditCardExpenseDto>> GetAllAsync(int companyId)
        {
            var fromDb = await _GENERIC_REPO.CreditCardExpenses.Get(
                predicate => predicate.CompanyId == companyId && predicate.Deleted == DateTime.MinValue,
                toInclude => toInclude.Include(x => x.CategoryExpense)
                .Include(x => x.SubcategoryExpense),
                selector => selector
                ).AsNoTracking().ToListAsync();

            if (fromDb == null) throw new Exception(GlobalErrorsMessagesException.ObjIsNull);

            var toViewDto = _IObjectMapperServices.CreditCardExpensesListMake(fromDb);

            return toViewDto;

        }
        public async Task<List<CreditCardExpenseDto>> GetCreditCardExpensesByIdInvoice(int invoiceId)
        {
            var fromDb = await _GENERIC_REPO.CreditCardExpenses.Get(
                predicate => predicate.CreditCardExpenseInvoiceId == invoiceId && predicate.Deleted == DateTime.MinValue,
                toInclude => toInclude.Include(x => x.CategoryExpense)
                .Include(x => x.SubcategoryExpense)
                .Include(x => x.CreditCardExpenseInvoice),
                selector => selector
                ).AsNoTracking().ToListAsync();

            if (fromDb == null) throw new Exception(GlobalErrorsMessagesException.ObjIsNull);

            var toViewDto = _IObjectMapperServices.CreditCardExpensesListMake(fromDb);

            return toViewDto;

        }
        public async Task<List<CardDto>> GetAllCreditCardsOnlyByCompanyIdAsync(int companyId)
        {
            var fromDb = await _GENERIC_REPO.CreditCards.Get(
                predicate => predicate.CompanyId == companyId
                && predicate.Deleted == DateTime.MinValue
                && predicate.Type != Domain.Entities.Finances.Enums.TypeCardEnum.Debit,
                toInclude => toInclude.Include(x => x.BankAccount)
                .Include(x => x.CreditCardExpensesInvoices),
                selector => selector
                ).ToListAsync();

            if (fromDb == null) throw new Exception(GlobalErrorsMessagesException.ObjIsNull);

            var toViewDto = _IObjectMapperServices.CardListMake(fromDb);

            return toViewDto;

        }

    }
}