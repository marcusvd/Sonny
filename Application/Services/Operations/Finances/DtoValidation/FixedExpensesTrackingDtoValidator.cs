using System;
using System.Collections.Generic;
using FluentValidation;

namespace Application.Services.Operations.Finances.Dtos
{
    public class FixedExpensesTrackingDtoValidator : AbstractValidator<FixedExpensesTrackingDto>
    {
        public FixedExpensesTrackingDtoValidator()
        {
            RuleFor(x => x.UserId).NotNull().NotEmpty();
            RuleFor(x => x.FixedExpensesId).NotNull().NotEmpty();
            // RuleFor(x => x.BankAccountId);
            RuleFor(x => x.WasPaid).NotNull().NotEmpty();
            RuleFor(x => x.Price).NotNull().NotEmpty().GreaterThanOrEqualTo(0);
            RuleFor(x => x.Interest).GreaterThanOrEqualTo(0);
            // RuleFor(x => x.PaidBy);
            RuleFor(x => x.CardId);
            
        }
    }
}