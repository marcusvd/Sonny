using Application.Services.Operations.BenchBudgetService.Dtos.Enums;
using Application.Services.Operations.BenchBudgetService.Dtos;
using Application.Services.Operations.BenchBudgetService.Exceptions;
using Domain.Entities.Main.Inheritances;

namespace Application.Services.Operations.BenchBudgetService.BusinessRulesValidation
{
    public static class BudgetServiceAddBusinessRuleValidation
    {
        public static void collectDeliverCost(
        PhysicallyMovingCosts physicallyMovingCosts,
        CollectDeliverCostsDto collectsDeliversCosts
        )
        {
            // if (collectsDeliversCosts.IsHaveCost && collectsDeliversCosts.CostFrom == CostFromEnumDto.NoCost)
            //     throw new BudgetServiceApplicationException(BudgetServiceErrorsMessagesException.CollectDeliverCost);
            // var costsRegisterFromCustomer = physicallyMovingCosts.GetType();

            var fields = physicallyMovingCosts.GetType();
            var propertyName = collectsDeliversCosts.CostFrom;

            foreach (var field in fields.GetProperties())
            {
                if (field.Name == propertyName.ToString())
                {
                    if (collectsDeliversCosts.CostFrom != CostFromEnumDto.NoCost
               && (decimal)field.GetValue(physicallyMovingCosts) <= 0)
                        throw new BudgetServiceApplicationException(BudgetServiceErrorsMessagesException.IncorrectCost);
                }
            }
        }
    }
}