using System.Threading.Tasks;
using AutoMapper;
using UnitOfWork.Persistence.Contracts;
using System.Collections.Generic;
using Application.Services.Operations.Finances.Dtos;
using Domain.Entities.Finances;
using Application.Exceptions;
using System;
using Application.Services.Operations.Finances.BusinessRulesValidation;

namespace Application.Services.Operations.Finances
{
    public class FinancialNotPredictableServices : IFinancialNotPredictableServices
    {
        private readonly IMapper _MAP;
        private readonly IUnitOfWork _GENERIC_REPO;
        public FinancialNotPredictableServices(
            IUnitOfWork GENERIC_REPO,
            IMapper MAP
            )
        {
            _GENERIC_REPO = GENERIC_REPO;
            _MAP = MAP;
        }
        public async Task<FinancialNotPredictableDto> AddAsync(FinancialNotPredictableDto entityDto)
        {
            if (entityDto == null) throw new Exception(GlobalErrorsMessagesException.ObjIsNull);


            var EntityToDb = _MAP.Map<FinancialNotPredictable>(entityDto);
            
            EntityToDb.EntryRegister = DateTime.Now;

            _GENERIC_REPO.NotPredictables.AddAsync(EntityToDb);

            if (await _GENERIC_REPO.save())
            {
                FinancialNotPredictable EntityFromDb = await _GENERIC_REPO.NotPredictables.GetByIdAsync(_id => _id.Id == EntityToDb.Id);

                return _MAP.Map<FinancialNotPredictableDto>(EntityFromDb);
            }

            return entityDto;
        }
        public async Task<FinancialNotPredictableDto[]> GetAllAsync(bool include = false)
        {
            List<FinancialNotPredictable> EntityFromDb = await _GENERIC_REPO.NotPredictables.GetAllAsync();

            if (EntityFromDb == null) return null;

            return _MAP.Map<FinancialNotPredictableDto[]>(EntityFromDb);
        }
    }
}