using System.Threading.Tasks;
using AutoMapper;
using UnitOfWork.Persistence.Operations;
using System;
using Application.Services.Operations.Finances.Dtos;
using Domain.Entities.Finances;
using Application.Exceptions;
using Application.Services.Operations.Finances.BusinessRulesValidation;

namespace Application.Services.Operations.Finances
{
    public class FinancialEssentialExpensesServices : IFinancialEssentialExpensesServices
    {
        private readonly IMapper _MAP;
        private readonly IUnitOfWork _GENERIC_REPO;
        public FinancialEssentialExpensesServices(
                         IUnitOfWork GENERIC_REPO,
                         IMapper MAP
                        )
        {
            _MAP = MAP;
            _GENERIC_REPO = GENERIC_REPO;
        }
        public async Task<FinancialEssentialExpensesDto> AddAsync(FinancialEssentialExpensesDto entityDto)
        {
            if (entityDto == null) throw new Exception(GlobalErrorsMessagesException.ObjIsNull);

            FinancialEssentialExpenses entityToDb = _MAP.Map<FinancialEssentialExpenses>(entityDto);

            entityToDb.EntryRegister = DateTime.Now;

            _GENERIC_REPO.EssentialExpenses.Add(entityToDb);

            await _GENERIC_REPO.save();

            return _MAP.Map<FinancialEssentialExpensesDto>(entityToDb);
        }
    }

}