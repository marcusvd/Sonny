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
using Application.Services.Operations.Finances.Dtos.Bank;
using Domain.Entities.Finances.Bank;
using Application.Services.Operations.Finances.CommonForServices;
using System.Linq;

namespace Application.Services.Operations.Finances.CreditCardExpenses
{
    public class CreditCardExpensesServices : InheritanceForFinancialServices, ICreditCardExpensesServices
    {
        private readonly IMapper _MAP;
        private readonly IUnitOfWork _GENERIC_REPO;
        private readonly ICommonForFinancialServices _ICOMMONFORFINANCIALSERVICES;
        public CreditCardExpensesServices(
            IUnitOfWork GENERIC_REPO,
            IMapper MAP,
            ICommonForFinancialServices ICOMMONFORFINANCIALSERVICES
            )
        {
            _GENERIC_REPO = GENERIC_REPO;
            _MAP = MAP;
            _ICOMMONFORFINANCIALSERVICES = ICOMMONFORFINANCIALSERVICES;
        }
        public async Task<HttpStatusCode> AddCreditCardExpenseAsync(CreditCardExpenseDto entityDto)
        {

            if (entityDto == null) throw new Exception(GlobalErrorsMessagesException.ObjIsNull);

            entityDto.Registered = DateTime.Now;
            entityDto.CreditCardLimitOperation.LimitCreditUsed += entityDto.Price;

            var expires = entityDto.Expires;

            var fromDb = await _GENERIC_REPO.CreditCardInvoicesExpenses.Get(
              predicate => predicate.CardId == entityDto.CardId
               && predicate.Deleted != true,
              null,
               selector => selector
              ).ToListAsync();

            // var fromDbToDto = _MAP.Map<List<CreditCardExpenseInvoiceDto>>(fromDb);

            var toDb = CreditCardExpensesListMake(entityDto);

            // CreditCardInvoicesListMakeViaAddCreditCardExpense(fromDbToDto, toDb);
            var creditCardExpensesInvoiceWhitoutInvoce = toDb.Where(dto => !fromDb.Any(fdb => new DateTime(fdb.Expires.Year, fdb.Expires.Month, fdb.Expires.Day)
            == new DateTime(dto.Expires.Year, dto.Expires.Month, dto.Expires.Day)
            && fdb.WasPaid == MinDate)).ToList();
            
            var creditCardExpensesWithInvoice = toDb.Where(dto => fromDb.Any(fdb => new DateTime(fdb.Expires.Year, fdb.Expires.Month, fdb.Expires.Day)
            == new DateTime(dto.Expires.Year, dto.Expires.Month, dto.Expires.Day)
            && fdb.WasPaid == MinDate)).ToList();

            // var AlreadyExistingInvoices = fromDb.Where(fdb => toDb.Any(dto => new DateTime(dto.Expires.Year, dto.Expires.Month, dto.Expires.Day)
            // == new DateTime(fdb.Expires.Year, fdb.Expires.Month, fdb.Expires.Day)
            // && fdb.WasPaid == MinDate)).ToList();

            if (toDb != null)
                toDb.ForEach(x =>
                {
                    // invoiceAlreadyExists.ForEach(y =>
                    // {
                    //     x.CreditCardExpenseInvoiceId = y.Id;
                    //     y.Price += x.InstallmentPrice;
                    // });

                });



            // toDb.ForEach(x =>
            // {
            //     fromDb.ForEach(fdb =>
            //     {
            //         var predicate = fdb.Expires.Month
            //         == x.Expires.Month && fdb.Expires.Year
            //         == x.Expires.Year && fdb.CardId
            //         == entityDto.CardId && fdb.WasPaid
            //         == MinDate;

            //         if (predicate)
            //         {
            //             x.CreditCardExpenseInvoiceId = fdb.Id;
            //             fdb.Price += x.InstallmentPrice;
            //         }

            //         // if(!predicate)
            //         // CreditCardInvoicesListMakeViaAddCreditCardExpense(x);
            //     });
            // });

            var entityToDto = _MAP.Map<List<CreditCardExpense>>(toDb);

            var limitOperation = await CreditCardLimitOperationUpdateAsync(entityDto.CreditCardLimitOperation.Id, entityDto.CreditCardLimitOperation);

            _GENERIC_REPO.CreditCardExpenses.AddRangeAsync(entityToDto);
            _GENERIC_REPO.CreditCardInvoicesExpenses.UpdateRange(fromDb);
            _GENERIC_REPO.CreditCardLimitOperations.Update(limitOperation);

            if (await _GENERIC_REPO.save())
                return HttpStatusCode.Created;

            return HttpStatusCode.BadRequest;
        }
        private async Task<CreditCardLimitOperation> CreditCardLimitOperationUpdateAsync(int creditCardLimitOperationId, CreditCardLimitOperationDto entity)
        {
            if (entity == null) throw new GlobalServicesException(GlobalErrorsMessagesException.ObjIsNull);
            if (creditCardLimitOperationId != entity.Id) throw new GlobalServicesException(GlobalErrorsMessagesException.IdIsDifferentFromEntityUpdate);

            var fromDb = await _GENERIC_REPO.CreditCardLimitOperations.GetById(
                x => x.Id == creditCardLimitOperationId,
                null,
                selector => selector
                );

            var updated = _MAP.Map(entity, fromDb);

            return updated;

        }


        public async Task<List<CreditCardExpenseDto>> GetAllAsync(int companyId)
        {
            var fromDb = await _GENERIC_REPO.CreditCardExpenses.Get(
                predicate => predicate.CompanyId == companyId && predicate.Deleted != true,
                toInclude => toInclude.Include(x => x.CategoryExpense)
                .Include(x => x.SubcategoryExpense),
                selector => selector
                ).AsNoTracking().ToListAsync();

            if (fromDb == null) throw new Exception(GlobalErrorsMessagesException.ObjIsNull);

            var toViewDto = _MAP.Map<List<CreditCardExpenseDto>>(fromDb);

            return toViewDto;

        }
        public async Task<List<CreditCardExpenseDto>> GetCreditCardExpensesByIdInvoice(int invoiceId)
        {
            var fromDb = await _GENERIC_REPO.CreditCardExpenses.Get(
                predicate => predicate.CreditCardExpenseInvoiceId == invoiceId && predicate.Deleted != true,
                toInclude => toInclude.Include(x => x.CategoryExpense)
                .Include(x => x.SubcategoryExpense)
                .Include(x => x.CreditCardExpenseInvoice),
                selector => selector
                ).AsNoTracking().ToListAsync();

            if (fromDb == null) throw new Exception(GlobalErrorsMessagesException.ObjIsNull);

            var toViewDto = _MAP.Map<List<CreditCardExpenseDto>>(fromDb);

            return toViewDto;

        }
        public async Task<List<CardDto>> GetAllCreditCardsOnlyByCompanyIdAsync(int companyId)
        {
            var fromDb = await _GENERIC_REPO.CreditCards.Get(
                predicate => predicate.CompanyId == companyId
                && predicate.Deleted != true
                && predicate.Type != Domain.Entities.Finances.Enums.TypeCardEnum.Debit,
                toInclude => toInclude.Include(x => x.BankAccount),
                selector => selector
                ).ToListAsync();

            if (fromDb == null) throw new Exception(GlobalErrorsMessagesException.ObjIsNull);

            var toViewDto = _MAP.Map<List<CardDto>>(fromDb);

            return toViewDto;

        }

    }
}