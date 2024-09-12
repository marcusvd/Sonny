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
        public async Task<HttpStatusCode> AddCreditCardExpenseInvoiceAsync(CreditCardExpenseInvoiceDto entityDto)
        {

            if (entityDto == null) throw new Exception(GlobalErrorsMessagesException.ObjIsNull);

            entityDto.Registered = DateTime.Now;

            var creditCardExpensesDtoInstallments = CreditCardExpensesListMake(entityDto.CreditCardExpense);

            entityDto.CreditCardExpenses = creditCardExpensesDtoInstallments;

            //toDb.CreditCardExpensesInstallments = CreditCardExpensesListMake(entityDto);

            var creditCardExpenseInvoicetoDb = _MAP.Map<CreditCardExpenseInvoice>(entityDto);
            var expires = entityDto.Expires;


            var fromDb = await _GENERIC_REPO.CreditCardInvoicesExpenses.GetById(
                predicate => predicate.CompanyId == entityDto.CompanyId && predicate.Deleted != true
                && predicate.Expires.Month == expires.Month && predicate.Expires.Year == expires.Year
                && predicate.CardId == entityDto.CardId && predicate.WasPaid == MinDate,
                null,
                 selector => selector
                );


            if (fromDb != null)
            {
                fromDb.CreditCardExpenses = creditCardExpenseInvoicetoDb.CreditCardExpenses;

                _GENERIC_REPO.CreditCardInvoicesExpenses.Update(fromDb);

                if (await _GENERIC_REPO.save())
                    return HttpStatusCode.Created;
            }
            else
            {
                _GENERIC_REPO.CreditCardInvoicesExpenses.Add(creditCardExpenseInvoicetoDb);
                if (await _GENERIC_REPO.save())
                    return HttpStatusCode.Created;
            }



            return HttpStatusCode.BadRequest;
        }

        public async Task<List<CreditCardExpenseInvoiceDto>> GetAllAsync(int companyId)
        {
            var fromDb = await _GENERIC_REPO.CreditCardExpenses.Get(
                predicate => predicate.CompanyId == companyId && predicate.Deleted != true,
                toInclude => toInclude.Include(x => x.CategoryExpense)
                .Include(x => x.SubcategoryExpense),
                selector => selector
                ).AsNoTracking().ToListAsync();

            if (fromDb == null) throw new Exception(GlobalErrorsMessagesException.ObjIsNull);

            var toViewDto = _MAP.Map<List<CreditCardExpenseInvoiceDto>>(fromDb);

            return toViewDto;

        }


    }
}