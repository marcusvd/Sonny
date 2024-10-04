using System;
using FluentValidation;

namespace Application.Services.Operations.Finances.Dtos.VariableDebitExpenses
{
    public class VariableExpensesDtoValidator : AbstractValidator<VariableExpenseDto>
    {
        public VariableExpensesDtoValidator()
        {
            RuleFor(x => x.UserId).NotNull().NotEmpty();
            RuleFor(x => x.BankAccountId).NotNull().NotEmpty();
            RuleFor(x => x.Expires).NotNull().NotEmpty();
            RuleFor(x => x.Price).NotNull().NotEmpty();
            RuleFor(x => x.Description).MaximumLength(150);
            RuleFor(x => x.Registered);
        }
    }
}