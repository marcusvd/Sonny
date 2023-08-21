using System;
using System.Collections.Generic;
using System.Linq;
using Application.Services.Operations.BenchBudgetService.Dtos;
using Application.Services.Operations.BenchBudgetService.Exceptions;
using Domain.Entities.ServicesBench;

namespace Application.Services.Operations.Products.BusinessRulesValidation
{
    public static class BudgetServiceOpenUpdateBusinessRuleValidation
    {
        public static void ServicePriceIsValid(List<TableProvidedServicePrice> tableProvidedServicePrice, List<PriceDto> prices)
        {
            var pricesNameFromEntity = prices.Select(x => x.ServiceName).ToList();
            var pricesNameFromDbTable = tableProvidedServicePrice.Select(x => x.ServiceName).ToList();

            var result = pricesNameFromEntity.Except(pricesNameFromDbTable).ToList();

            if (result.Any())
                throw new BudgetServiceApplicationException(BudgetServiceErrorsMessagesException.ServicesPricesInvalid);

        }

        public static void IsAuthorized(ServiceDto service)
        {
            if (service.IsAuthorized.Date != DateTime.MinValue && service.IsAuthorized.Date > DateTime.Now.Date)
                throw new BudgetServiceApplicationException(BudgetServiceErrorsMessagesException.startedDate);

            if (service.IsAuthorized.Date != DateTime.MinValue && service.IsAuthorized.Date < DateTime.Now.Date)
                throw new BudgetServiceApplicationException(BudgetServiceErrorsMessagesException.startedDate);
        }

        public static void StartedFinishedDate(ServiceDto service)
        {
            if (service.IsAuthorized.Date  == DateTime.MinValue && service.Started.Date != DateTime.MinValue)
                throw new BudgetServiceApplicationException(BudgetServiceErrorsMessagesException.startedDate);

            if (service.IsAuthorized.Date  == DateTime.MinValue && service.Finished.Date != DateTime.MinValue)
                throw new BudgetServiceApplicationException(BudgetServiceErrorsMessagesException.startedDate);

            if (service.Started.Date != DateTime.MinValue && service.Started.Date < DateTime.Now.Date)
                throw new BudgetServiceApplicationException(BudgetServiceErrorsMessagesException.startedDate);

            if (service.Started.Date != DateTime.MinValue && service.Started.Date > DateTime.Now.Date)
                throw new BudgetServiceApplicationException(BudgetServiceErrorsMessagesException.startedDate);
                
            if (service.Finished.Date != DateTime.MinValue && service.Finished.Date < DateTime.Now.Date)
                throw new BudgetServiceApplicationException(BudgetServiceErrorsMessagesException.startedDate);

            if (service.Finished.Date != DateTime.MinValue && service.Finished.Date > DateTime.Now.Date)
                throw new BudgetServiceApplicationException(BudgetServiceErrorsMessagesException.startedDate);
        }
    }
}