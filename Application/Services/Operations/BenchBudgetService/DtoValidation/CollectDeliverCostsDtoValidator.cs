using Application.Services.Operations.BenchBudgetService.Dtos;
using FluentValidation;

namespace Application.Services.Operations.BenchBudgetService.DtoValidation
{
    public class CollectDeliverCostsDtoValidator : AbstractValidator<CollectDeliverCostsDto>
    {
        public CollectDeliverCostsDtoValidator()
        {
            RuleFor(x => x.Price).GreaterThanOrEqualTo(0);
            RuleFor(x => x.RoundTrip);
            RuleFor(x => x.CostFrom);
            
        }


    }
}