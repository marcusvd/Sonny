using FluentValidation;
using Services.Dto.Financial;

namespace Api.Helpers.Validators
{
    public class TypePaymentValidator : AbstractValidator<TypePaymentDto>
    {
        public TypePaymentValidator()
        {
            //Commons
            RuleFor(xx => xx.Name).NotEmpty().NotNull().MaximumLength(150);
            RuleFor(xx => xx.Description).MaximumLength(86);
            
        }
    }
}


