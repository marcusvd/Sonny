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
using Application.Services.Operations.Finances.Dtos.Bank;

namespace Application.Services.Operations.Finances.CreditCardExpenses
{
    public class CreditCardExpensesServices : CommonFinancialForServices, ICreditCardExpensesServices
    {
        private readonly IMapper _MAP;
        private readonly IUnitOfWork _GENERIC_REPO;
        public CreditCardExpensesServices(
            IUnitOfWork GENERIC_REPO,
            IMapper MAP
            )
        {
            _GENERIC_REPO = GENERIC_REPO;
            _MAP = MAP;
        }
        public async Task<HttpStatusCode> AddCreditCardExpenseAsync(CreditCardExpenseDto entityDto)
        {

            if (entityDto == null) throw new Exception(GlobalErrorsMessagesException.ObjIsNull);

            entityDto.Registered = DateTime.Now;
            entityDto.CreditCardLimitOperation.LimitCreditUsed += entityDto.Price;

            var expires = entityDto.Expires;

            var fromDb = await _GENERIC_REPO.CreditCardInvoicesExpenses.GetById(
              predicate => predicate.CompanyId == entityDto.CompanyId && predicate.Deleted != true
              && predicate.Expires.Month == expires.Month && predicate.Expires.Year == expires.Year
              && predicate.CardId == entityDto.CardId && predicate.WasPaid == MinDate,
              null,
               selector => selector
              );

            if (fromDb != null)
                entityDto.CreditCardExpenseInvoiceId = fromDb.Id;

            var toDb = CreditCardExpensesListMake(entityDto);

            var entityToDto = _MAP.Map<List<CreditCardExpense>>(toDb);

            _GENERIC_REPO.CreditCardExpenses.AddRangeAsync(entityToDto);

            if (await _GENERIC_REPO.save())
            {
                var result = await UpdateAsync(entityDto.CreditCardLimitOperation.Id, entityDto.CreditCardLimitOperation);
                return HttpStatusCode.Created;
            }

            return HttpStatusCode.BadRequest;
        }

        public async Task<HttpStatusCode> UpdateAsync(int creditCardLimitOperationId, CreditCardLimitOperationDto entity)
        {
            if (entity == null) throw new GlobalServicesException(GlobalErrorsMessagesException.ObjIsNull);
            if (creditCardLimitOperationId != entity.Id) throw new GlobalServicesException(GlobalErrorsMessagesException.IdIsDifferentFromEntityUpdate);

            var fromDb = await _GENERIC_REPO.CreditCardLimitOperations.GetById(
                x => x.Id == creditCardLimitOperationId,
                null,
                selector => selector
                );

            var updated = _MAP.Map(entity, fromDb);

            _GENERIC_REPO.CreditCardLimitOperations.Update(updated);

            var result = await _GENERIC_REPO.save();

            if (result)
                return HttpStatusCode.OK;

            return HttpStatusCode.BadRequest;
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
    }
}