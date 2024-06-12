using System;
using System.Collections.Generic;
using FluentValidation;

namespace Application.Services.Operations.Finances.Dtos
{
    public class MonthFixedExpensesTrackingDtoValidator : AbstractValidator<MonthFixedExpensesTrackingDto>
    {
        public MonthFixedExpensesTrackingDtoValidator()
        {
            RuleFor(x => x.UserId).NotNull().NotEmpty();
            RuleFor(x => x.MonthFixedExpensesId).NotNull().NotEmpty();
            // RuleFor(x => x.BankAccountId);
            RuleFor(x => x.WasPaid).NotNull().NotEmpty();
            RuleFor(x => x.Price).NotNull().NotEmpty().GreaterThanOrEqualTo(0);
            RuleFor(x => x.Interest).GreaterThanOrEqualTo(0);
            // RuleFor(x => x.PaidBy);
            RuleFor(x => x.CardId);
            
        }
    }
}