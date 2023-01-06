using System;
using FluentValidation;
using Services.Dto.Financial;

namespace Api.Helpers.Validators
{
    public class CardValidator : AbstractValidator<CardDto>
    {
        public CardValidator()
        {

            RuleFor(xx => xx.Holder).NotEmpty().NotNull().MaximumLength(100);

            When(xx =>  xx.Type.ToLower().Equals("débito"), () =>
            {
                RuleFor(xx => xx.Limit);
            }).Otherwise(()=>{
                 RuleFor(xx => xx.Limit).NotEmpty().NotNull();
            });






            RuleFor(xx => xx.Flag).NotEmpty().NotNull().MaximumLength(50);

            // RuleFor(xx => xx.Limit).NotEmpty().NotNull();

            RuleFor(xx => xx.Number).NotEmpty().NotNull().MaximumLength(20);
            RuleFor(xx => xx.CheckCode).NotEmpty().NotNull().GreaterThan(0);
            RuleFor(xx => xx.Validate).NotEmpty().NotNull();
            RuleFor(xx => xx.Description).MaximumLength(100);
        }
    }
}