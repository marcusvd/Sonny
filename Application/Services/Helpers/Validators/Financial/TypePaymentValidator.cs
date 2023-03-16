using FluentValidation;
using Application.Dto.Financial;

namespace Application.Services.Helpers.Validators.Financial
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


