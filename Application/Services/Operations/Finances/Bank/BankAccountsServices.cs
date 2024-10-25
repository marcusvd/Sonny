using System.Threading.Tasks;
using UnitOfWork.Persistence.Operations;
using System;
using Application.Services.Operations.Finances.Dtos.Bank;
using Application.Exceptions;
using Application.Services.Operations.Finances.BusinessRulesValidation;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Net;
using System.Linq;
using Application.Services.Operations.Finances.CommonForServices;
using Application.Services.Operations.Finances.Dtos;


namespace Application.Services.Operations.Finances.Bank
{
    public class BankAccountsServices : InheritanceForFinancialServices, IBankAccountsServices
    {
        private readonly IFinancialObjectMapperServices _IObjectMapperServices;
        private readonly IUnitOfWork _GENERIC_REPO;
        public BankAccountsServices(
            IUnitOfWork GENERIC_REPO,
            IFinancialObjectMapperServices IObjectMapperServices
            )
        {
            _GENERIC_REPO = GENERIC_REPO;
            _IObjectMapperServices = IObjectMapperServices;
        }
        public async Task<HttpStatusCode> AddAsync(BankAccountDto entityDto)
        {
            if (entityDto == null) throw new Exception(GlobalErrorsMessagesException.ObjIsNull);

            FinancesAddBusinessRulesValidation.CardValidateGreaterThanCurrentDate(entityDto.Cards);
            entityDto.Registered = DateTime.Now;

            if (entityDto.Cards != null)
            {
                entityDto.Cards.ForEach(x =>
                {
                    x.Deleted = DateTime.MinValue;
                    x.Registered = DateTime.MinValue;
                });
            }

            var EntityToDb = _IObjectMapperServices.BankAccountMapper(entityDto);

            _GENERIC_REPO.BankAccounts.Add(EntityToDb);

            if (await _GENERIC_REPO.save())
                return HttpStatusCode.Created;

            return HttpStatusCode.BadRequest;
        }

        public async Task<List<BankAccountDto>> GetAllAsync(int companyId)
        {
            var fromDb = await _GENERIC_REPO.BankAccounts.Get(
                predicate => predicate.CompanyId == companyId && predicate.Deleted == DateTime.MinValue,
                toInclude => toInclude.Include(x => x.Cards)
               .ThenInclude(x => x.CreditCardLimitOperation)
                .Include(x => x.Pixes),
                selector => selector
                ).ToListAsync();

            if (fromDb == null) throw new Exception(GlobalErrorsMessagesException.ObjIsNull);

            var toViewDto = _IObjectMapperServices.BankAccountListMake(fromDb);

            return toViewDto;

        }

        public async Task<BankAccountDto> GetByIdAllIncluded(int fnBankAccountId)
        {
            var entityFromDb = await _GENERIC_REPO.BankAccounts.GetById(
                 predicate => predicate.Id == fnBankAccountId && predicate.Deleted == DateTime.MinValue,
                toInclude =>
                toInclude
                .Include(x => x.Cards)
                .ThenInclude(x => x.CreditCardLimitOperation)
                .Include(x => x.Pixes),
                selector => selector);

            if (entityFromDb == null) throw new GlobalServicesException(GlobalErrorsMessagesException.ObjIsNull);

            var toReturnViewDto = _IObjectMapperServices.BankAccountMapper(entityFromDb);

            return toReturnViewDto;
        }

        public async Task<HttpStatusCode> UpdateAsync(int fnBankAccountId, BankAccountDto entity)
        {
            if (entity == null) throw new GlobalServicesException(GlobalErrorsMessagesException.ObjIsNull);
            if (fnBankAccountId != entity.Id) throw new GlobalServicesException(GlobalErrorsMessagesException.IdIsDifferentFromEntityUpdate);

            var fromDb = await _GENERIC_REPO.BankAccounts.GetById(
                x => x.Id == fnBankAccountId,
                toInclude => toInclude.Include(x => x.Cards)
                .ThenInclude(x => x.CreditCardLimitOperation)
                .Include(x => x.Pixes),
                selector => selector
                );

            var updated = _IObjectMapperServices.BankAccountUpdateMapper(entity, fromDb);

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
                x.Deleted = DateTime.Now;
            });

            fromDb.Pixes.ToList().ForEach(x =>
            {
                x.Deleted = DateTime.Now;
            });


            fromDb.Deleted = DateTime.Now;

            _GENERIC_REPO.BankAccounts.Update(fromDb);

            var result = await _GENERIC_REPO.save();

            if (result)
                return HttpStatusCode.OK;

            return HttpStatusCode.BadRequest;
        }



    }
}