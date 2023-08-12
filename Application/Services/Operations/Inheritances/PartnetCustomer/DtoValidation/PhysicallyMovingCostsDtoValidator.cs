using Application.Services.Operations.Inheritances.PartnetCustomer.Dtos;
using FluentValidation;


namespace Application.Services.Operations.Inheritances.PartnetCustomer.DtoValidation
{
    public class PhysicallyMovingCostsDtoValidator : AbstractValidator<PhysicallyMovingCostsDto>
    {
        public PhysicallyMovingCostsDtoValidator()
        {
            RuleFor(xx => xx.FixedCostAssured).GreaterThanOrEqualTo(0);
            RuleFor(xx => xx.Fuel).GreaterThanOrEqualTo(0);
            RuleFor(xx => xx.Apps).GreaterThanOrEqualTo(0);
            RuleFor(xx => xx.PublicTransport).GreaterThanOrEqualTo(0);
            RuleFor(xx => xx.MotoBoy).GreaterThanOrEqualTo(0);
        }
    }
}


