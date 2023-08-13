using System;
using FluentValidation;

namespace Application.Services.Operations.Finances.Dtos
{
    public class CardDtoValidator : AbstractValidator<FinancialCardDto>
    {
        public CardDtoValidator()
        {
            RuleFor(x => x.Holder).NotNull().NotEmpty().MaximumLength(150);
            RuleFor(x => x.Flag).NotNull().NotEmpty();
            RuleFor(x => x.Limit).NotNull().NotEmpty().GreaterThanOrEqualTo(0);
            RuleFor(x => x.Type).NotNull().NotEmpty();
            RuleFor(x => x.Number).NotNull().NotEmpty().MaximumLength(150);
            RuleFor(x => x.CheckCode).NotNull().NotEmpty().GreaterThanOrEqualTo(0);
            RuleFor(x => x.Description).NotNull().NotEmpty().MaximumLength(500);
            RuleFor(x => x.Validate).NotNull().NotEmpty();
        }
    }
}