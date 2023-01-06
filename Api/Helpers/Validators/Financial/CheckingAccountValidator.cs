using FluentValidation;
using Services.Dto.Financial;
namespace Api.Helpers.Validators
{
    public class CheckingAccountValidator : AbstractValidator<CheckingAccountDto>
    {
        public CheckingAccountValidator()
        {
            //Commons
            RuleFor(xx => xx.Holder).NotEmpty().NotNull().MaximumLength(100);
            RuleFor(xx => xx.Institution).NotEmpty().NotNull().MaximumLength(100);
            RuleFor(xx => xx.Agency).NotEmpty().NotNull().MaximumLength(20);
            RuleFor(xx => xx.Account).NotEmpty().NotNull().MaximumLength(100);
            RuleFor(xx => xx.Type).NotEmpty().NotNull();
            RuleFor(xx => xx.ManagerName).MaximumLength(50);
            RuleFor(xx => xx.ManagerContact).MaximumLength(100);
            RuleFor(xx => xx.Pix).MaximumLength(100);
            RuleFor(xx => xx.Balance).NotEmpty().NotNull();
            RuleFor(xx => xx.Description).MaximumLength(100);
            //Collection
            RuleForEach(xx => xx.Cards).SetValidator(new CardValidator());
        }
    }
}

