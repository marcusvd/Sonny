using System;
using FluentValidation;

namespace Application.Services.Operations.Finances.Dtos
{
    public class VariableExpensesDtoValidator : AbstractValidator<VariableExpensesDto>
    {
        public VariableExpensesDtoValidator()
        {
            RuleFor(x => x.UserId).NotNull().NotEmpty();
            RuleFor(x => x.BankAccountId).NotNull().NotEmpty();
            RuleFor(x => x.Item).NotNull().NotEmpty().MaximumLength(50);
            RuleFor(x => x.PaidDay).NotNull().NotEmpty();
            RuleFor(x => x.Price).NotNull().NotEmpty();
            RuleFor(x => x.Description).MaximumLength(150);
            RuleFor(x => x.Registered);
            
        }
    }
}