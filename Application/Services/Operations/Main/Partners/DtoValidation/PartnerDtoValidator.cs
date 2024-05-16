using FluentValidation;

using Application.Services.Operations.Main.Partners.Dtos;
using Application.Services.Shared.DtoValidation;
using Application.Services.Operations.Main.Inheritances.DtoValidation;

namespace Application.Services.Operations.Main.Partners.DtoValidation
{
    public class PartnerDtoValidator : AbstractValidator<PartnerDto>
    {
        public PartnerDtoValidator()
        {
            //Commons
            When(xx => xx.BusinessLine.ToLower().Equals("outros"), () =>
            {
                RuleFor(xx => xx.BusinessLine).MaximumLength(0)
                .WithMessage("Opção incorreta (OUTROS), selecione uma opção válida.");
            }).Otherwise(() =>
            {
                RuleFor(xx => xx.BusinessLine).NotEmpty().NotNull().MaximumLength(100);
            });

            When(xx => xx.BusinessLine.ToLower().Equals("selecione uma opção"), () =>
            {
                RuleFor(xx => xx.BusinessLine).MaximumLength(0)
                .WithMessage("Opção incorreta (SELECIONE UMA OPÇÃO) , selecione uma opção válida.");
            }).Otherwise(() =>
            {
                RuleFor(xx => xx.BusinessLine).NotEmpty().NotNull().MaximumLength(100);
            });

            RuleFor(xx => xx.Name).NotEmpty().NotNull().MaximumLength(100);
            RuleFor(xx => xx.Registered).NotEmpty().NotNull();
            RuleFor(xx => xx.CNPJ).NotEmpty().NotNull().MinimumLength(8).MaximumLength(100);
            RuleFor(xx => xx.Responsible).NotEmpty().NotNull();
            RuleFor(xx => xx.Description).MaximumLength(2000);
            //Childrens
            RuleFor(xxAddress => xxAddress.Address).SetValidator(new AddressValidator());
            RuleFor(xxContact => xxContact.Contact).SetValidator(new ContactValidator());
             //PhysicallyMovingCosts
            RuleFor(x => x.PhysicallyMovingCosts).SetValidator(new PhysicallyMovingCostsDtoValidator());

        }
    }
}


