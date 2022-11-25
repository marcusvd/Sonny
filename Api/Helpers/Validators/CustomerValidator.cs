using Domain.Entities;
using FluentValidation;
using Services.Dto;

namespace Api.Helpers.Validators
{
    public class CustomerValidator : AbstractValidator<CustomerDto>
    {
        public CustomerValidator()
        {
            //Payment
            RuleFor(xx => xx.Payment)
            .NotEmpty()
            .NotNull()
            .When(xx => xx.Assured == true).ScalePrecision(2, 8).GreaterThanOrEqualTo(1);
            //  RuleFor(xx => xx.Payment).ScalePrecision(2, 8).GreaterThanOrEqualTo(1);

            //Expiration day
            RuleFor(xx => xx.Expiration)
            .NotEmpty()
            .NotNull()
            .When(xx => xx.Assured == true).GreaterThanOrEqualTo(1).LessThanOrEqualTo(31);

        }
    }
}