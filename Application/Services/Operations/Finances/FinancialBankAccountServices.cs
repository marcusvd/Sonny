using System.Threading.Tasks;
using AutoMapper;
using UnitOfWork.Persistence.Contracts;
using System;
using Application.Services.Operations.Finances.Dtos;
using Domain.Entities.Finances;
using Application.Exceptions;
using Application.Services.Operations.Finances.BusinessRulesValidation;

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

            _GENERIC_REPO.BankAccounts.AddAsync(EntityToDb);

            if (await _GENERIC_REPO.save())
            {
                FinancialBankAccount EntityFromDb = await _GENERIC_REPO.BankAccounts.GetByIdAsync(_id => _id.Id == EntityToDb.Id);

                return _MAP.Map<FinancialBankAccountDto>(EntityFromDb);
            }

            return entityDto;
        }
    }
}