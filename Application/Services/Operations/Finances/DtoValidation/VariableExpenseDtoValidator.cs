using System;
using Application.Services.Operations.Finances.Dtos.CashWithdrawnExpenses;
using FluentValidation;

namespace Application.Services.Operations.Finances.Dtos.VariableDebitExpenses
{
    public class CashWithdrawnExpensesDtoValidator : AbstractValidator<CashWithdrawnExpenseDto>
    {
        public CashWithdrawnExpensesDtoValidator()
        {
            RuleFor(x => x.UserId).NotNull().NotEmpty();
            RuleFor(x => x.BankAccountId).NotNull().NotEmpty();
            RuleFor(x => x.Price).NotNull().NotEmpty();
            RuleFor(x => x.Description).MaximumLength(150);
            RuleFor(x => x.Registered);
        }
    }
}