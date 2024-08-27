
using Application.Services.Operations.Finances.Dtos.MonthlyExpenses;
using FluentValidation;

namespace Application.Services.Operations.Finances.Dtos
{
    public class MonthlyFixedExpensesDtoValidator : AbstractValidator<MonthlyFixedExpenseDto>
    {
        public MonthlyFixedExpensesDtoValidator()
        {
            RuleFor(x => x.Description).MaximumLength(150);
            RuleFor(x => x.Expires).NotNull().NotEmpty();
            RuleFor(x => x.LinkCopyBill).MaximumLength(500);
            RuleFor(x => x.USERLinkCopyBill).MaximumLength(500);
            RuleFor(x => x.PASSLinkCopyBill).MaximumLength(500);
  
        }
    }
}