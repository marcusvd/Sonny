using System.Threading.Tasks;
using AutoMapper;
using UnitOfWork.Persistence.Operations;
using System;
using Application.Services.Operations.Finances.Dtos.Bank;
using Domain.Entities.Finances.Bank;
using Application.Exceptions;
using Application.Services.Operations.Finances.BusinessRulesValidation;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Net;
using System.Linq;
using Application.Services.Operations.Finances.CommonForServices;


namespace Application.Services.Operations.Finances.Bank
{
    public class BankAccountsServices : InheritanceForFinancialServices, IBankAccountsServices
    {
        private readonly IMapper _MAP;
        private readonly IUnitOfWork _GENERIC_REPO;
        public BankAccountsServices(
            IUnitOfWork GENERIC_REPO,
            IMapper MAP
            )
        {
            _GENERIC_REPO = GENERIC_REPO;
            _MAP = MAP;
        }
        public async Task<HttpStatusCode> AddAsync(BankAccountDto entityDto)
        {
            if (entityDto == null) throw new Exception(GlobalErrorsMessagesException.ObjIsNull);

            FinancesAddBusinessRulesValidation.CardValidateGreaterThanCurrentDate(entityDto.Cards);
            entityDto.Registered = DateTime.Now;

            if (entityDto.Cards != null)
                entityDto.Cards = AddAsyncMakeInvoices(entityDto.Cards);

            var EntityToDb = _MAP.Map<BankAccount>(entityDto);

            _GENERIC_REPO.BankAccounts.Add(EntityToDb);

            if (await _GENERIC_REPO.save())
                return HttpStatusCode.Created;

            return HttpStatusCode.BadRequest;
        }
        private List<CardDto> AddAsyncMakeInvoices(List<CardDto> cards)
        {
            cards.ForEach(x =>
                          {
                              if (x.Type == Dtos.Enums.TypeCardEnumDto.Credit || x.Type == Dtos.Enums.TypeCardEnumDto.CreditAndDebit)
                              {
                                  x.CreditCardLimitOperation.Registered = DateTime.Now;
                                  x.Registered = DateTime.Now;
                                  x.CreditCardExpensesInvoices = CreditCardInvoicesListMake(x);
                              }
                          });
            return cards;
        }
        public async Task<List<BankAccountDto>> GetAllAsync(int companyId)
        {
            var fromDb = await _GENERIC_REPO.BankAccounts.Get(
                predicate => predicate.CompanyId == companyId && predicate.Deleted != true,
                toInclude => toInclude.Include(x => x.Cards)
               .ThenInclude(x => x.CreditCardLimitOperation)
                .Include(x => x.Pixes),
                selector => selector
                ).ToListAsync();

            if (fromDb == null) throw new Exception(GlobalErrorsMessagesException.ObjIsNull);

            var toViewDto = _MAP.Map<List<BankAccountDto>>(fromDb);

            return toViewDto;

        }
     
        public async Task<BankAccountDto> GetByIdAllIncluded(int fnBankAccountId)
        {
            var entityFromDb = await _GENERIC_REPO.BankAccounts.GetById(
                 predicate => predicate.Id == fnBankAccountId && predicate.Deleted != true,
                toInclude =>
                toInclude
                .Include(x => x.Cards)
                .Include(x => x.Pixes),
                selector => selector);

            if (entityFromDb == null) throw new GlobalServicesException(GlobalErrorsMessagesException.ObjIsNull);

            var toReturnViewDto = _MAP.Map<BankAccountDto>(entityFromDb);

            return toReturnViewDto;
        }

        public async Task<HttpStatusCode> UpdateAsync(int fnBankAccountId, BankAccountDto entity)
        {
            if (entity == null) throw new GlobalServicesException(GlobalErrorsMessagesException.ObjIsNull);
            if (fnBankAccountId != entity.Id) throw new GlobalServicesException(GlobalErrorsMessagesException.IdIsDifferentFromEntityUpdate);

            var fromDb = await _GENERIC_REPO.BankAccounts.GetById(
                x => x.Id == fnBankAccountId,
                null,
                selector => selector
                );

            var updated = _MAP.Map(entity, fromDb);

            _GENERIC_REPO.BankAccounts.Update(updated);

            var result = await _GENERIC_REPO.save();

            if (result)
                return HttpStatusCode.OK;

            return HttpStatusCode.BadRequest;
        }

        public async Task<HttpStatusCode> DeleteFakeAsync(int fnBankAccountId)
        {

            var fromDb = await _GENERIC_REPO.BankAccounts.GetById(
                x => x.Id == fnBankAccountId,
                toInclude => toInclude.Include(x => x.Cards)
                .Include(x => x.Pixes),
                selector => selector
                );

            fromDb.Cards.ToList().ForEach(x =>
            {
                x.Deleted = true;
            });

            fromDb.Pixes.ToList().ForEach(x =>
            {
                x.Deleted = true;
            });


            fromDb.Deleted = true;

            _GENERIC_REPO.BankAccounts.Update(fromDb);

            var result = await _GENERIC_REPO.save();

            if (result)
                return HttpStatusCode.OK;

            return HttpStatusCode.BadRequest;
        }



    }
}