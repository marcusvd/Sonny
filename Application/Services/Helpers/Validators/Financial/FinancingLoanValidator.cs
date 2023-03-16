using FluentValidation;
using Application.Dto.Financial;

namespace Application.Services.Helpers.Validators.Financial
{
    public class FinancingLoanValidator : AbstractValidator<FinancingLoanDto>
    {
        public FinancingLoanValidator()
        {
            //Commons
            RuleFor(xx => xx.Name).NotEmpty().NotNull().MaximumLength(150);
            RuleFor(xx => xx.Value).NotEmpty().NotNull();
            RuleFor(xx => xx.Started).NotEmpty().NotNull();
            RuleFor(xx => xx.Expiration).NotEmpty().NotNull().GreaterThanOrEqualTo(1).LessThanOrEqualTo(31);
            RuleFor(xx => xx.Installment).NotEmpty().NotNull().GreaterThanOrEqualTo(1);
            RuleFor(xx => xx.User).MaximumLength(50);
            RuleFor(xx => xx.Password).MaximumLength(20);
            RuleFor(xx => xx.Institution).NotEmpty().NotNull().MaximumLength(150);
            RuleFor(xx => xx.Duplicate).MaximumLength(250);
            RuleFor(xx => xx.Comments).MaximumLength(100);
        }
    }
}

