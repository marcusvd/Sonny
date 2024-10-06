using System.Threading.Tasks;
using AutoMapper;
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
using System.Linq;
using Domain.Entities.Finances.CreditCardExpenses;

namespace Application.Services.Operations.Finances.CreditCardExpenses
{
  public class CreditCardExpensesServices : InheritanceExpensesAndInvoices, ICreditCardExpensesServices
  {
    private readonly IMapper _MAP;
    private readonly IUnitOfWork _GENERIC_REPO;
    private readonly ICommonForFinancialServices _ICOMMONFORFINANCIALSERVICES;
    private readonly ICreditCardExpensesInvoiceServices _ICREDITCARDEXPENSESINVOICESERVICES;
    public CreditCardExpensesServices(
        IUnitOfWork GENERIC_REPO,
        IMapper MAP,
        ICommonForFinancialServices ICOMMONFORFINANCIALSERVICES,
        ICreditCardExpensesInvoiceServices ICREDITCARDEXPENSESINVOICESERVICES
        )
    {
      _GENERIC_REPO = GENERIC_REPO;
      _MAP = MAP;
      _ICOMMONFORFINANCIALSERVICES = ICOMMONFORFINANCIALSERVICES;
      _ICREDITCARDEXPENSESINVOICESERVICES = ICREDITCARDEXPENSESINVOICESERVICES;
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

      var toDb = CreditCardExpensesInstallmentListMake(entityDto);

      var installmentWithoutInvoice = InstallmentWithoutInvoice(fromDb, toDb);

      if (installmentWithoutInvoice.Count > 0)
      {
        await _ICREDITCARDEXPENSESINVOICESERVICES.AddInvoicesAsync(installmentWithoutInvoice);

      }

      var withInvoicesAssosiated = InstallmentWithInvoice(GetInvoicesFromDb(entityDto).Result, toDb);





      //Without
      //var WithoutInvoice = CreditCardExpensesInstallmentWithoutInvoices(fromDb, toDb);

      var update = dtoToEntity(withInvoicesAssosiated.CreditCardExpenses);

      var limitOperation = await CreditCardLimitOperationUpdateAsync(entityDto.CreditCardLimitOperation.Id, entityDto.CreditCardLimitOperation);

      _GENERIC_REPO.CreditCardExpenses.AddRangeAsync(update);
      _GENERIC_REPO.CreditCardInvoicesExpenses.UpdateRange(withInvoicesAssosiated.CreditCardExpensesInvoices);
      _GENERIC_REPO.CreditCardLimitOperations.Update(limitOperation);

      if (await _GENERIC_REPO.save())
        return HttpStatusCode.Created;

      return HttpStatusCode.BadRequest;
    }


    private async Task<List<CreditCardExpenseInvoice>> GetInvoicesFromDb(CreditCardExpenseDto entityDto)
    {
      var fromDb = await _GENERIC_REPO.CreditCardInvoicesExpenses.Get(
            predicate => predicate.CardId == entityDto.CardId
             && predicate.Deleted != true,
            null,
             selector => selector
            ).ToListAsync();

            return fromDb;
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