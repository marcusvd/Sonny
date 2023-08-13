using System.Collections.Generic;
using Application.Services.Operations.Finances.Dtos;
using Application.Services.Operations.Finances.Dtos.Enums;
using Application.Services.Operations.Main.Companies.Dtos;
using FluentValidation;

namespace Application.Services.Operations.Finances.DtoValidation
{
    public class BankAccountDtoValidator : AbstractValidator<FinancialBankAccountDto>
    {
        public BankAccountDtoValidator()
        {
            RuleFor(x => x.Holder).NotNull().NotEmpty().MaximumLength(150);
            RuleFor(x => x.Institution).NotNull().NotEmpty().MaximumLength(50);
            RuleFor(x => x.Account).NotNull().NotEmpty().MaximumLength(50);
            RuleFor(x => x.Agency).NotNull().NotEmpty().MaximumLength(50);
            RuleFor(x => x.ManagerName).NotNull().NotEmpty().MaximumLength(150);
            RuleFor(x => x.ManagerContact).NotNull().NotEmpty().MaximumLength(150);
            RuleFor(x => x.Pix).NotNull().NotEmpty().MaximumLength(50);
            RuleFor(x => x.Balance).NotNull().NotEmpty();
            RuleFor(x => x.Type).NotNull().NotEmpty();
            RuleFor(x => x.Description).NotNull().NotEmpty().MaximumLength(7);
            RuleForEach(x => x.Cards).SetValidator(new CardDtoValidator());
        }
    }

}