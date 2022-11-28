using FluentValidation;
using Services.Dto.Financial;

namespace Api.Helpers.Validators
{
    public class EssentialExpenseValidatorValue : AbstractValidator<EssentialExpenseValueDto>
    {
        public EssentialExpenseValidatorValue()
        {
            //Commons
            RuleFor(xx => xx.Value).NotEmpty().NotNull().GreaterThanOrEqualTo(0);
            RuleFor(xx => xx.Paid).NotEmpty().NotNull();
            RuleFor(xx => xx.Comments).MaximumLength(200);
            RuleFor(xx => xx.EssentialExpenseId).NotEmpty().NotNull();
            
        }
    }
}


