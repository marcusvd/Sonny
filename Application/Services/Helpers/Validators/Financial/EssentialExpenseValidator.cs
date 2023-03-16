using FluentValidation;
using Application.Dto.Financial;

namespace Application.Services.Helpers.Validators.Financial
{
    public class EssentialExpenseValidator : AbstractValidator<EssentialExpenseDto>
    {
        public EssentialExpenseValidator()
        {
            
            When(xx => xx.Name.ToLower().Equals("outros"), () =>
            {
                RuleFor(xx => xx.Name).MaximumLength(0)
                .WithMessage("Opção incorreta (OUTROS), selecione uma opção válida.");
            }).Otherwise(() =>
            {
                RuleFor(xx => xx.Name).NotEmpty().NotNull().MaximumLength(100);
            });

            When(xx => xx.Name.ToLower().Equals("selecione uma opção"), () =>
            {
                RuleFor(xx => xx.Name).MaximumLength(0)
                .WithMessage("Opção incorreta (SELECIONE UMA OPÇÃO) , selecione uma opção válida.");
            }).Otherwise(() =>
            {
                RuleFor(xx => xx.Name).NotEmpty().NotNull().MaximumLength(100);
            });

            RuleFor(xx => xx.CyclePayment).NotEmpty().NotNull();
            RuleFor(xx => xx.Expiration).NotEmpty().NotNull();
            RuleFor(xx => xx.Comments).MaximumLength(200);
            RuleFor(xx => xx.User).MaximumLength(50);
            RuleFor(xx => xx.Password).MaximumLength(20);
            RuleFor(xx => xx.Duplicate).MaximumLength(250);
            RuleForEach(xx => xx.EssentialsExpensesValues).SetValidator(new EssentialExpenseValidatorValue());
        }
    }
}


