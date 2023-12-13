using System;
using System.Collections.Generic;
using System.Linq;
using Application.Services.Operations.BenchBudgetService.Dtos;
using Application.Services.Operations.BenchBudgetService.Dtos.Enums;
using AutoMapper;
using Domain.Entities.ServicesBench;
using Domain.Entities.ServicesBench.Enums;

namespace Application.Services.Operations.BenchBudgetService.Helper
{
    public class BudgetServiceHelperOpenService
    {
        private readonly IMapper _MAP;
        public BudgetServiceHelperOpenService(IMapper MAP)
        {
            _MAP = MAP;
        }

        public List<Price> ServicesPriceToRemove(BudgetServiceDto entityDto, List<Price> servicesPricesFromDb)
        {
            List<Price> pricesToRemove = new();

            entityDto.Service.Prices.ForEach(xy =>
            {
                servicesPricesFromDb.ForEach(x =>
                 {
                     if (!x.ServiceName.Equals(xy.ServiceName))
                         pricesToRemove.Add(x);
                 }
                );
            });

            return pricesToRemove.Distinct().ToList();
        }

        public BudgetService CreatedEntities(List<TableProvidedServicePrice> tableOfPriceService, BudgetServiceDto entityDto, BudgetService fromDb)
        {
            List<PriceDto> entities = new();

            tableOfPriceService.ForEach(xy =>
            {
                entityDto.Service.Prices.ForEach(x =>
                {
                    if (xy.ServiceName.Equals(x.ServiceName))
                    {
                        entities.Add(x);
                    }
                });
            });

            // entityDto.Service.AmountPrice = entities.Sum(x => x.PriceService + GetCollectDeliverCost(entityDto.CollectsDeliversCosts));
            entityDto.Service.Prices = entities;

            if (entityDto.StatusService == StatusServiceEnumDto.Finished || entityDto.StatusService == StatusServiceEnumDto.InProcess || entityDto.StatusService == StatusServiceEnumDto.Evaluating)
                entityDto.StatusService = ChangeStatus(entityDto.Service);


            var toReturn = _MAP.Map(entityDto, fromDb);

            // return _MAP.Map<BudgetServiceDto>(entityDto);
             return toReturn;
        }

        // public decimal GetCollectDeliverCost(CollectDeliverCostsDto cdCosts)
        // {
        //     decimal result = 0;

        //     if (cdCosts.IsHaveCost)
        //         result = cdCosts.ApartPrice > 0 ? cdCosts.ApartPrice : cdCosts.Price;

        //     return result;
        // }

        public StatusServiceEnumDto ChangeStatus(ServiceDto service)
        {
            if (service.Finished != DateTime.MinValue)
                return StatusServiceEnumDto.Finished;

            if (service.Started != DateTime.MinValue)
                return StatusServiceEnumDto.InProcess;

            if (service.IsAuthorized != DateTime.MinValue)
                return StatusServiceEnumDto.Evaluating;

            return StatusServiceEnumDto.WaitingAuthorized;
        }
        // public StatusServiceEnumDto ChangeStatusByView(ServiceDto service)
        // {
        //     if (service.Finished != DateTime.MinValue)
        //         return StatusServiceEnumDto.Finished;

        //     if (service.Started != DateTime.MinValue)
        //         return StatusServiceEnumDto.InProcess;

        //     if (service.IsAuthorized != DateTime.MinValue)
        //         return StatusServiceEnumDto.Evaluating;

        //     return StatusServiceEnumDto.WaitingAuthorized;
        // }

    }
}