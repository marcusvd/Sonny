using System;
using System.Collections.Generic;
using FluentValidation;

namespace Application.Services.Operations.Finances.Dtos
{
    public class EssentialCycleDtoValidator : AbstractValidator<FinancialEssentialCycleDto>
    {
        public EssentialCycleDtoValidator()
        {
            RuleFor(x => x.PaidBy).NotNull().NotEmpty();
            RuleFor(x => x.WasPaid).NotNull().NotEmpty();
            RuleFor(x => x.Price).NotNull().NotEmpty().GreaterThanOrEqualTo(0);
            RuleFor(x => x.Interest).NotNull().NotEmpty().GreaterThanOrEqualTo(0);
        }
    }
}