using System;
using FluentValidation;

namespace Application.Services.Operations.Finances.Dtos
{
    public class ExpensesNotPredictableDtoValidator : AbstractValidator<FinancialExpensesNotPredictableDto>
    {
        public ExpensesNotPredictableDtoValidator()
        {
            RuleFor(x => x.UserId).NotNull().NotEmpty();
            RuleFor(x => x.BankAccountId).NotNull().NotEmpty();
            RuleFor(x => x.PaidBy).NotNull().NotEmpty();
            RuleFor(x => x.ItemOrPlaceName).NotNull().NotEmpty().MaximumLength(50);
            RuleFor(x => x.DaySpent).NotNull().NotEmpty();
            RuleFor(x => x.Price).NotNull().NotEmpty();
            RuleFor(x => x.Description).MaximumLength(150);
            RuleFor(x => x.EntryRegister);
            RuleFor(x => x.CardId);
            RuleFor(x => x.CustomerId);
        }
    }
}