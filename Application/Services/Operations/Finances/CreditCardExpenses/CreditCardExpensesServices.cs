using System.Threading.Tasks;
using UnitOfWork.Persistence.Operations;
using System.Collections.Generic;
using System;
using Application.Exceptions;
using System.Net;
using Application.Services.Operations.Finances.Dtos.CreditCardExpenses;
using Microsoft.EntityFrameworkCore;
using Application.Services.Operations.Finances.Dtos.Bank;
using Domain.Entities.Finances.Bank;
using Application.Services.Operations.Finances.CommonForServices;
using Application.Services.Operations.Finances.Helpers.CreditCardExpenses.Helpers;
using Domain.Entities.Finances.CreditCardExpenses;
using Application.Services.Operations.Finances.Dtos;

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

            var fromDb = await GetInvoicesFromDb(entityDto);

            var toDb = CreditCardExpensesInstallmentListMake(entityDto);

            var installmentWithoutInvoice = InstallmentWithoutInvoice(fromDb, toDb);

            var withInvoicesAssosiated = InstallmentWithInvoice(fromDb, toDb);

            if (installmentWithoutInvoice.Count > 0)
                await _ICREDITCARDEXPENSESINVOICESERVICES.AddInvoicesAsync(installmentWithoutInvoice);

            _GENERIC_REPO.CreditCardExpenses.AddRangeAsync(DtoToEntity(withInvoicesAssosiated.CreditCardExpenses));
            _GENERIC_REPO.CreditCardInvoicesExpenses.UpdateRange(fromDb);

            var limitOperation = await _ICOMMONFORFINANCIALSERVICES.CreditCardLimitOperationNewExpenseAsync(entityDto.CreditCardLimitOperation.Id, entityDto.CreditCardLimitOperation.UserId, entityDto.Price);
            
            _GENERIC_REPO.CreditCardLimitOperations.Update(limitOperation);

            if (await _GENERIC_REPO.save())
                return HttpStatusCode.Created;

            return HttpStatusCode.BadRequest;
        }


        private async Task<List<CreditCardExpenseInvoice>> GetInvoicesFromDb(CreditCardExpenseDto entityDto)
        {
            var fromDb = await _GENERIC_REPO.CreditCardInvoicesExpenses.Get(
                  predicate => predicate.CardId == entityDto.CardId
                   && predicate.Deleted == DateTime.MinValue,
                  null,
                   selector => selector
                  ).ToListAsync();

            return fromDb;
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
                toInclude => toInclude.Include(x => x.BankAccount),
                selector => selector
                ).ToListAsync();

            if (fromDb == null) throw new Exception(GlobalErrorsMessagesException.ObjIsNull);

            var toViewDto = _IObjectMapperServices.CardListMake(fromDb);

            return toViewDto;

        }

    }
}