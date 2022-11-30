using Api.Entities.Shared.Validators;
using FluentValidation;
using Services.Dto;

namespace Api.Helpers.Validators
{
    public class PartnerValidator : AbstractValidator<PartnerDto>
    {
        public PartnerValidator()
        {
            //Commons
            When(xx => xx.Businessline.ToLower().Equals("outros"), () =>
            {
                RuleFor(xx => xx.Businessline).MaximumLength(0)
                .WithMessage("Opção incorreta (OUTROS), selecione uma opção válida.");
            }).Otherwise(() =>
            {
                RuleFor(xx => xx.Businessline).NotEmpty().NotNull().MaximumLength(100);
            });

            When(xx => xx.Businessline.ToLower().Equals("selecione uma opção"), () =>
            {
                RuleFor(xx => xx.Businessline).MaximumLength(0)
                .WithMessage("Opção incorreta (SELECIONE UMA OPÇÃO) , selecione uma opção válida.");
            }).Otherwise(() =>
            {
                RuleFor(xx => xx.Businessline).NotEmpty().NotNull().MaximumLength(100);
            });

            RuleFor(xx => xx.Name).NotEmpty().NotNull().MaximumLength(100);
            RuleFor(xx => xx.Registered).NotEmpty().NotNull();
            RuleFor(xx => xx.CNPJ).NotEmpty().NotNull().MinimumLength(8).MaximumLength(100);
            RuleFor(xx => xx.Responsible).NotEmpty().NotNull();
            RuleFor(xx => xx.Comments).MaximumLength(500);
            //Childrens
            RuleFor(xxAddress => xxAddress.Address).SetValidator(new AddressValidator());
            RuleFor(xxContact => xxContact.Contact).SetValidator(new ContactValidator());

        }
    }
}


