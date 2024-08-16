using System;
using Application.Services.Operations.Finances.Dtos.Bank;
using FluentValidation;

namespace Application.Services.Operations.Finances.Dtos
{
    public class CardDtoValidator : AbstractValidator<CardDto>
    {
        public CardDtoValidator()
        {
            RuleFor(x => x.Holder).NotNull().NotEmpty().MaximumLength(150);
            RuleFor(x => x.Flag).NotNull().NotEmpty();
            RuleFor(x => x.Limit).GreaterThanOrEqualTo(0);
            RuleFor(x => x.Number).NotNull().NotEmpty().MaximumLength(150);
            RuleFor(x => x.CVC).GreaterThanOrEqualTo(0);
            RuleFor(x => x.Description).MaximumLength(500);
            RuleFor(x => x.Validate).NotNull().NotEmpty();
            RuleFor(x => x.Type);
        }
    }
}