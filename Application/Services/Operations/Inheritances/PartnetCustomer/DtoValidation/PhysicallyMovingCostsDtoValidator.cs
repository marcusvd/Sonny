using Application.Services.Operations.Inheritances.PartnetCustomer.Dtos;
using FluentValidation;


namespace Application.Services.Operations.Inheritances.PartnetCustomer.DtoValidation
{
    public class PhysicallyMovingCostsDtoValidator : AbstractValidator<PhysicallyMovingCostsDto>
    {
        public PhysicallyMovingCostsDtoValidator()
        {
            RuleFor(x => x.Fuel).GreaterThanOrEqualTo(0);
            RuleFor(x => x.Apps).GreaterThanOrEqualTo(0);
            RuleFor(x => x.PublicTransport).GreaterThanOrEqualTo(0);
            RuleFor(x => x.MotoBoy).GreaterThanOrEqualTo(0);
        }
    }
}


