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
    public class FinancialBankAccountServices : IFinancialBankAccountServices
    {
        private readonly IMapper _MAP;
        private readonly IUnitOfWork _GENERIC_REPO;
        public FinancialBankAccountServices(
            IUnitOfWork GENERIC_REPO,
            IMapper MAP
            )
        {
            _GENERIC_REPO = GENERIC_REPO;
            _MAP = MAP;
        }
        public async Task<FinancialBankAccountDto> AddAsync(FinancialBankAccountDto entityDto)
        {
            if (entityDto == null) throw new Exception(GlobalErrorsMessagesException.ObjIsNull);

            FinancesAddBusinessRulesValidation.CardValidateGreaterThanCurrentDate(entityDto.Cards);

            var EntityToDb = _MAP.Map<FinancialBankAccount>(entityDto);

            _GENERIC_REPO.BankAccounts.Add(EntityToDb);

            if (await _GENERIC_REPO.save())
            {
                var EntityFromDb = await _GENERIC_REPO.BankAccounts.GetById(
                    _id => _id.Id == EntityToDb.Id,
                    null,
                    selector => selector
                    );

                return _MAP.Map<FinancialBankAccountDto>(EntityFromDb);
            }

            return entityDto;
        }

        public async Task<List<FinancialBankAccountDto>> GetAllAsync(int companyId)
        {
            var fromDb = await _GENERIC_REPO.BankAccounts.Get(
                predicate => predicate.CompanyId == companyId,
                toInclude => toInclude.Include(x => x.Cards),
                selector => selector
                ).ToListAsync();

            if (fromDb == null) throw new Exception(GlobalErrorsMessagesException.ObjIsNull);

            var toViewDto = _MAP.Map<List<FinancialBankAccountDto>>(fromDb);

            return toViewDto;

        }



    }
}