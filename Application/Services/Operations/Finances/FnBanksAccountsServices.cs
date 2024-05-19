using System.Threading.Tasks;
using AutoMapper;
using UnitOfWork.Persistence.Operations;
using System;
using Application.Services.Operations.Finances.Dtos;
using Domain.Entities.Finances;
using Application.Exceptions;
using Application.Services.Operations.Finances.BusinessRulesValidation;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;

namespace Application.Services.Operations.Finances
{
    public class FnBanksAccountsServices : IFnBanksAccountsServices
    {
        private readonly IMapper _MAP;
        private readonly IUnitOfWork _GENERIC_REPO;
        public FnBanksAccountsServices(
            IUnitOfWork GENERIC_REPO,
            IMapper MAP
            )
        {
            _GENERIC_REPO = GENERIC_REPO;
            _MAP = MAP;
        }
        public async Task<BankAccountDto> AddAsync(BankAccountDto entityDto)
        {
            if (entityDto == null) throw new Exception(GlobalErrorsMessagesException.ObjIsNull);

            FinancesAddBusinessRulesValidation.CardValidateGreaterThanCurrentDate(entityDto.Cards);

            var EntityToDb = _MAP.Map<BankAccount>(entityDto);

            _GENERIC_REPO.BankAccounts.Add(EntityToDb);

            if (await _GENERIC_REPO.save())
            {
                var EntityFromDb = await _GENERIC_REPO.BankAccounts.GetById(
                    _id => _id.Id == EntityToDb.Id,
                    null,
                    selector => selector
                    );

                return _MAP.Map<BankAccountDto>(EntityFromDb);
            }

            return entityDto;
        }

        public async Task<List<BankAccountDto>> GetAllAsync(int companyId)
        {
            var fromDb = await _GENERIC_REPO.BankAccounts.Get(
                predicate => predicate.CompanyId == companyId,
                toInclude => toInclude.Include(x => x.Cards)
                .Include(x=> x.Pixes),
                selector => selector
                ).ToListAsync();

            if (fromDb == null) throw new Exception(GlobalErrorsMessagesException.ObjIsNull);

            var toViewDto = _MAP.Map<List<BankAccountDto>>(fromDb);

            return toViewDto;

        }



    }
}