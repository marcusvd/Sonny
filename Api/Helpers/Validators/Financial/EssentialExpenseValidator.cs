using FluentValidation;
using Services.Dto.Financial;

namespace Api.Helpers.Validators
{
    public class EssentialExpenseValidator : AbstractValidator<EssentialExpenseDto>
    {
        public EssentialExpenseValidator()
        {
            //Commons

            When(xx => xx.Name.Equals("OUTROS"), () =>
            {
                RuleFor(xx => xx.NameOther).NotEmpty().NotNull().MaximumLength(100);
            }).Otherwise(() =>
            {
                RuleFor(xx => xx.NameOther);
            });

            RuleFor(xx => xx.Name).NotEmpty().NotNull().MaximumLength(100);
            RuleFor(xx => xx.CyclePayment).NotEmpty().NotNull();
            RuleFor(xx => xx.Expiration).NotEmpty().NotNull();
            RuleFor(xx => xx.Comments).MaximumLength(200);
            RuleForEach(xx => xx.EssentialsExpensesValues).SetValidator(new EssentialExpenseValidatorValue());
        }
    }
}


