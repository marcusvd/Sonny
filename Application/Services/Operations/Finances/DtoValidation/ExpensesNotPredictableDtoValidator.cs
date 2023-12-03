using System;
using FluentValidation;

namespace Application.Services.Operations.Finances.Dtos
{
    public class ExpensesNotPredictableDtoValidator : AbstractValidator<FinancialExpensesNotPredictableDto>
    {
        public ExpensesNotPredictableDtoValidator()
        {
            RuleFor(x => x.PaidBy).NotNull().NotEmpty();
            RuleFor(x => x.ItemOrPlaceName).NotNull().NotEmpty();
            RuleFor(x => x.DaySpent).NotNull().NotEmpty();
            RuleFor(x => x.Price).NotNull().NotEmpty();
            RuleFor(x => x.Description);
            RuleFor(x => x.EntryRegister);
        }
    }
}