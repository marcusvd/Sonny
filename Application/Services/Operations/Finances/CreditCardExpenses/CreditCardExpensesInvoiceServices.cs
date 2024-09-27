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

            if (fromDb.AmountPrice != result)
                fromDb.AmountPrice = result;

            _GENERIC_REPO.CreditCardInvoicesExpenses.Update(fromDb);

            if (await _GENERIC_REPO.save())
                return HttpStatusCode.OK;

            return HttpStatusCode.BadRequest;

        }

        // public async Task<CreditCardExpenseInvoiceDto> GetByIdAllIncluded(int monthlyFixedExpensesI)
        // {
        //     var entityFromDb = await _GENERIC_REPO.CreditCardInvoicesExpenses.GetById(
        //          predicate => predicate.Id == monthlyFixedExpensesI && predicate.Deleted != true,
        //         toInclude =>
        //         toInclude
        //         .Include(x => x.CreditCardExpenses)
        //         .Include(x => x.)
        //         .Include(x => x.User)
        //         .Include(x => x.BankAccount)
        //         .Include(x => x.Card)
        //         .Include(x => x.Pix),
        //         selector => selector);

        //     if (entityFromDb == null) throw new GlobalServicesException(GlobalErrorsMessagesException.ObjIsNull);

        //     var toReturnViewDto = _MAP.Map<CreditCardExpenseInvoiceDto>(entityFromDb);

        //     return toReturnViewDto;
        // }

    }
}