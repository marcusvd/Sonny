using System.Threading.Tasks;
using AutoMapper;
using UnitOfWork.Persistence.Operations;
using System.Collections.Generic;
using Application.Services.Operations.Finances.Dtos;
using Domain.Entities.Finances;
using Application.Exceptions;
using System;
using Application.Services.Operations.Finances.BusinessRulesValidation;

namespace Application.Services.Operations.Finances
{
    public class FinancialExpensesNotPredictableServices : IFinancialExpensesNotPredictableServices
    {
        private readonly IMapper _MAP;
        private readonly IUnitOfWork _GENERIC_REPO;
        public FinancialExpensesNotPredictableServices(
            IUnitOfWork GENERIC_REPO,
            IMapper MAP
            )
        {
            _GENERIC_REPO = GENERIC_REPO;
            _MAP = MAP;
        }
        public async Task<FinancialExpensesNotPredictableDto> AddAsync(FinancialExpensesNotPredictableDto entityDto)
        {
            if (entityDto == null) throw new Exception(GlobalErrorsMessagesException.ObjIsNull);


            var EntityToDb = _MAP.Map<ExpensesNotPredictable>(entityDto);
            
            EntityToDb.EntryRegister = DateTime.Now;

            _GENERIC_REPO.ExpensesNotPredictables.Add(EntityToDb);

            if (await _GENERIC_REPO.save())
            {
                ExpensesNotPredictable EntityFromDb = await _GENERIC_REPO.ExpensesNotPredictables.GetById(
                    _id => _id.Id == EntityToDb.Id,
                    null,
                    selector => selector
                    );

                return _MAP.Map<FinancialExpensesNotPredictableDto>(EntityFromDb);
            }

            return entityDto;
        }
        // public async Task<FinancialExpensesNotPredictableDto[]> GetAllAsync(bool include = false)
        // {
        //     // List<FinancialExpensesNotPredictable> EntityFromDb = await _GENERIC_REPO.NotPredictables.Get(x => x.);

        //     // if (EntityFromDb == null) return null;

        //     // return _MAP.Map<FinancialExpensesNotPredictableDto[]>(EntityFromDb);
        //     return null;
        // }
    }
}