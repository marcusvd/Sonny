using System.Threading.Tasks;
using AutoMapper;
using UnitOfWork.Persistence.Operations;
using System;
using Application.Exceptions;
using Application.Services.Operations.BenchBudgetService.Dtos;
using Domain.Entities.ServicesBench;
using Application.Services.Operations.BenchBudgetService.Helper;
using System.Linq;
using Microsoft.EntityFrameworkCore;

namespace Application.Services.Operations.BenchBudgetService
{
    public class OpenBudgetServiceServices : IOpenBudgetServiceServices
    {
        private readonly IMapper _MAP;
        private readonly IUnitOfWork _GENERIC_REPO;

        public OpenBudgetServiceServices(
                         IUnitOfWork GENERIC_REPO,
                         IMapper MAP
                        )
        {
            _MAP = MAP;
            _GENERIC_REPO = GENERIC_REPO;
        }
        public async Task<BudgetServiceDto> OpenServiceAsync(int BudgetServiceId, BudgetServiceDto entityDto)
        {
            if (BudgetServiceId != entityDto.Id)
                throw new Exception(GlobalErrorsMessagesException.IdIsDifferentFromEntityUpdate);

            var fromDb = await _GENERIC_REPO.BudgetsServices.GetById(
                predicate => predicate.Id == BudgetServiceId,
                null,
                selector => selector
                );

            var minValue = DateTime.MinValue;

            if (fromDb == null)
                if (fromDb == null) throw new Exception(GlobalErrorsMessagesException.ObjIsNull);

            if (entityDto.EntryDate == minValue)
                entityDto.EntryDate = fromDb.EntryDate;

            if (entityDto.Service.Finished != minValue)
                entityDto.Service.Finished = minValue;

            var TableProvidedServicePrice = await _GENERIC_REPO.TableProvidedServicesPrices.Get().ToListAsync();
            var servicesPricesFromDb = await _GENERIC_REPO.ServicesPrices.GetAllByIdService(entityDto.Service.Id);

            entityDto.CollectsDeliversCosts = _MAP.Map<CollectDeliverCostsDto>(await _GENERIC_REPO.BudgetsServices.CollectDeliverCostsByIdAsync(entityDto.CollectsDeliversCosts.Id));

            // BudgetServiceOpenUpdateBusinessRuleValidation.ServicePriceIsValid(TableProvidedServicePrice, entityDto.Service.Repairs);
            // BudgetServiceOpenUpdateBusinessRuleValidation.IsAuthorized(entityDto.Service);
            // BudgetServiceOpenUpdateBusinessRuleValidation.StartedFinishedDate(entityDto.Service);

            BudgetServiceHelperOpenService budgetServiceDto = new(_MAP);

            var removeUpdated = budgetServiceDto.ServicesRepairToRemove(entityDto, servicesPricesFromDb);

            if (removeUpdated.Any())
                _GENERIC_REPO.ServicesPrices.RemoveRange(removeUpdated);

            var toUpdate = budgetServiceDto.CreatedEntities(TableProvidedServicePrice, entityDto, fromDb);

            // var toUpdate = _MAP.Map<BudgetService>(bsDto);

            _GENERIC_REPO.BudgetsServices.Update(toUpdate);

            if (await _GENERIC_REPO.save())
            {
                var toReturnView = await _GENERIC_REPO.BudgetsServices.GetById(
                    x => x.Id == toUpdate.Id,
                    null,
                    selector => selector
                    );
                return _MAP.Map<BudgetServiceDto>(toReturnView);
            }
            return entityDto;
        }

    }
}