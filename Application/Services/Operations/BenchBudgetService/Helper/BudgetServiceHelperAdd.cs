using Application.Services.Operations.BenchBudgetService.Dtos.Enums;
using Application.Services.Operations.BenchBudgetService.Dtos;
using Domain.Entities.Main.Inheritances;

namespace Application.Services.Operations.BenchBudgetService.Helper
{
  
  
    public class BudgetServiceHelperAdd
    {

        public void CollectDeliverCostsMaker(
         PhysicallyMovingCosts physicallyMovingCosts,
        CollectDeliverCostsDto collectsDeliversCosts
        )
        {
            if (collectsDeliversCosts.CostFrom != CostFromEnumDto.NoCost)
            // if (collectsDeliversCosts.IsHaveCost)
            {
                var propertyName = collectsDeliversCosts.CostFrom;
                var fields = physicallyMovingCosts.GetType();

                foreach (var prop in fields.GetProperties())
                {
                    if (CostFromEnumDto.ApartPrice == collectsDeliversCosts.CostFrom)
                    {
                        if (collectsDeliversCosts.RoundTrip)
                        {
                            collectsDeliversCosts.Price = collectsDeliversCosts.Price * 2;
                            // collectsDeliversCosts.ApartPrice = collectsDeliversCosts.ApartPrice * 2;
                        }
                        return;
                    }

                    if (prop.Name == propertyName.ToString())
                    {
                        // collectsDeliversCosts.ApartPrice = 0;

                        collectsDeliversCosts.CostFrom = propertyName;

                        if (collectsDeliversCosts.RoundTrip)
                        {
                            var xTwo = (decimal)prop.GetValue(physicallyMovingCosts) * 2;

                            collectsDeliversCosts.Price = xTwo;
                        }
                        else
                        {
                            collectsDeliversCosts.Price = (decimal)prop.GetValue(physicallyMovingCosts);
                        }
                    }
                }
            }
            else
            {
                collectsDeliversCosts.RoundTrip = false;
                collectsDeliversCosts.CostFrom = CostFromEnumDto.NoCost;
            }
        }

    }


}