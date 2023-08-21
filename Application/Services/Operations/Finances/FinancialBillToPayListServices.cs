using System.Threading.Tasks;
using AutoMapper;
using UnitOfWork.Persistence.Contracts;
using System.Collections.Generic;
using System;
using Application.Services.Operations.Finances.Dtos;
using Domain.Entities.Finances;
using Application.Exceptions;
using Application.Services.Operations.Finances.BusinessRulesValidation;

namespace Application.Services.Operations.Finances
{
    public class FinancialBillToPayListServices : IFinancialBillToPayListServices
    {
        private readonly IMapper _MAP;
        private readonly IUnitOfWork _GENERIC_REPO;
        public FinancialBillToPayListServices(
            IUnitOfWork GENERIC_REPO,
            IMapper MAP
            )
        {
            _GENERIC_REPO = GENERIC_REPO;
            _MAP = MAP;
        }
        public async Task<FinancialBillToPayListDto> AddAsync(FinancialBillToPayListDto entityDto)
        {

            if (entityDto == null) throw new Exception(GlobalErrorsMessagesException.ObjIsNull);
            
            FinancesAddBusinessRulesValidation.ExpirationGreaterThanCurrentDate(entityDto);

            var EntityToDb = _MAP.Map<FinancialBillToPayList>(entityDto);

            _GENERIC_REPO.BillToPayLists.AddAsync(EntityToDb);

            if (await _GENERIC_REPO.save())
            {
                FinancialBillToPayList EntityFromDb = await _GENERIC_REPO.BillToPayLists.GetByIdAsync(_id => _id.Id == EntityToDb.Id);

                return _MAP.Map<FinancialBillToPayListDto>(EntityFromDb);
            }

            return entityDto;
        }
    }
}