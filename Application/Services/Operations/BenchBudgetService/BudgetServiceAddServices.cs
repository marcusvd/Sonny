using System;
using System.Threading.Tasks;
using AutoMapper;
using Application.Services.Operations.BenchBudgetService.Dtos;
using Domain.Entities.ServicesBench;
using Application.Exceptions;
using Application.Services.Operations.BenchBudgetService.BusinessRulesValidation;
using Application.Services.Operations.BenchBudgetService.Helper;
using UnitOfWork.Persistence.Operations;
using Microsoft.EntityFrameworkCore;

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

            var customer = await _GENERIC_REPO.Customers.GetById(
                predicate => predicate.Id == entityDto.CustomerId,
                toInclude => toInclude.Include(x => x.PhysicallyMovingCosts),
                selector => selector);

            if (customer == null) throw new Exception(GlobalErrorsMessagesException.ObjIsNull);

            BudgetServiceAddBusinessRuleValidation.collectDeliverCost(customer.PhysicallyMovingCosts, entityDto.CollectsDeliversCosts);

            new BudgetServiceHelperAdd().CollectDeliverCostsMaker
            (customer.PhysicallyMovingCosts, entityDto.CollectsDeliversCosts);

            BudgetService entityConvertedToDb = _MAP.Map<BudgetService>(entityDto);

            entityConvertedToDb.EntryDate = DateTime.Now;

            _GENERIC_REPO.BudgetsServices.Add(entityConvertedToDb);

            if (await _GENERIC_REPO.save())
            {
                var entityFromDb = _GENERIC_REPO.BudgetsServices.GetById(
                    predicate => predicate.Id == entityDto.Id,
                    null,
                    selector => selector
                    );
                return _MAP.Map<BudgetServiceDto>(entityConvertedToDb);
            }

            return entityDto;
        }

        public async Task<BudgetServiceDto> UpdateAsync(int id, BudgetServiceDto entityDto)
        {
            if (entityDto == null) throw new Exception(GlobalErrorsMessagesException.ObjIsNull);

            if (id != entityDto.Id) throw new Exception(GlobalErrorsMessagesException.IdIsDifferentFromEntityUpdate);

            var fromDb = await _GENERIC_REPO.BudgetsServices.GetById(x => x.Id == entityDto.Id);

            var toUpdate = _MAP.Map(entityDto, fromDb);

            _GENERIC_REPO.BudgetsServices.Update(toUpdate);

            if (await _GENERIC_REPO.save())
            {
                return null;
            }

            return null;

        }





    }
}
