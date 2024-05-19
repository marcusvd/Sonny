using System.Collections.Generic;
using Application.Services.Operations.Finances.Dtos;
using Application.Services.Operations.Finances.Dtos.Enums;
using Application.Services.Operations.Main.Companies.Dtos;
using FluentValidation;

namespace Application.Services.Operations.Finances.DtoValidation
{
    public class BankAccountDtoValidator : AbstractValidator<BankAccountDto>
    {
        public BankAccountDtoValidator()
        {
            RuleFor(x => x.Holder).NotNull().NotEmpty().MaximumLength(150);
            RuleFor(x => x.Institution).NotNull().NotEmpty().MaximumLength(50);
            RuleFor(x => x.Account).NotNull().NotEmpty().MaximumLength(50);
            RuleFor(x => x.Agency).NotNull().NotEmpty().MaximumLength(50);
            RuleFor(x => x.ManagerName).MaximumLength(150);
            RuleFor(x => x.ManagerContact).MaximumLength(150);
            // RuleFor(x => x.PixDto).NotNull().NotEmpty().MaximumLength(50);
            // RuleFor(x => x.Description).NotNull().NotEmpty().MaximumLength(150);
            RuleFor(x => x.Description).MaximumLength(150);
            RuleForEach(x => x.Cards).SetValidator(new CardDtoValidator());
            RuleFor(x => x.Type);
        }
    }

}