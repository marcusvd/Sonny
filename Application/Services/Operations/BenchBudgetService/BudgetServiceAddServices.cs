using System;
using System.Threading.Tasks;
using AutoMapper;
using UnitOfWork.Persistence.Contracts;
using Application.Services.Operations.BenchBudgetService.Dtos;
using Domain.Entities.ServicesBench;
using Application.Exceptions;
using Application.Services.Operations.BenchBudgetService.BusinessRulesValidation;
using Application.Services.Operations.BenchBudgetService.Helper;

namespace Application.Services.Operations.BenchBudgetService
{
    public class BudgetServiceAddServices : IBudgetServiceAddServices
    {
        private readonly IMapper _MAP;
        private readonly IUnitOfWork _GENERIC_REPO;
        public BudgetServiceAddServices(
                        IMapper MAP,
                        IUnitOfWork GENERIC_REPO
 )
        {
            _MAP = MAP;
            _GENERIC_REPO = GENERIC_REPO;
        }

        public async Task<BudgetServiceDto> AddAsync(BudgetServiceDto entityDto)
        {
            if (entityDto == null) throw new Exception(GlobalErrorsMessagesException.ObjIsNull);

            var customer = await _GENERIC_REPO.Customers
                                   .GetByIdAIcludedPhysicallyMovingCostsAsync(entityDto.CompanyId, entityDto.CustomerId);

            if (customer == null) throw new Exception(GlobalErrorsMessagesException.ObjIsNull);

            BudgetServiceAddBusinessRuleValidation.collectDeliverCost(customer.PhysicallyMovingCosts, entityDto.CollectsDeliversCosts);

            new BudgetServiceHelperAdd().CollectDeliverCostsMaker
            (customer.PhysicallyMovingCosts, entityDto.CollectsDeliversCosts);

            BudgetService entityConvertedToDb = _MAP.Map<BudgetService>(entityDto);

            entityConvertedToDb.EntryDate = DateTime.Now;

            _GENERIC_REPO.BudgetsServices.AddAsync(entityConvertedToDb);

            if (await _GENERIC_REPO.save())
            {
                var entityFromDb = _GENERIC_REPO.BudgetsServices.GetByIdAsync(x => x.Id == entityDto.Id);
                return _MAP.Map<BudgetServiceDto>(entityConvertedToDb);
            }

            return entityDto;
        }

    }
}
