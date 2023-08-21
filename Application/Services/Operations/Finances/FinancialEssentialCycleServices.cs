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
    public class FinancialEssentialCycleServices : IFinancialEssentialCycleServices
    {
        private readonly IMapper _MAP;
        private readonly IUnitOfWork _GENERIC_REPO;
        public FinancialEssentialCycleServices(
                         IUnitOfWork GENERIC_REPO,
                         IMapper MAP
                        )
        {
            _MAP = MAP;
            _GENERIC_REPO = GENERIC_REPO;
        }
        public async Task<FinancialEssentialCycleDto> AddAsync(FinancialEssentialCycleDto entityDto)
        {
            if (entityDto == null) throw new Exception(GlobalErrorsMessagesException.ObjIsNull);

            FinancialEssentialCycle entityToDb = _MAP.Map<FinancialEssentialCycle>(entityDto);

            entityToDb.EntryRegister = DateTime.Now;

            _GENERIC_REPO.EssentialCycles.AddAsync(entityToDb);

            await _GENERIC_REPO.save();

            return _MAP.Map<FinancialEssentialCycleDto>(entityToDb);
        }
    }

}