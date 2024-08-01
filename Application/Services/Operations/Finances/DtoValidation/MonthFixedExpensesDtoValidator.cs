
using FluentValidation;

namespace Application.Services.Operations.Finances.Dtos
{
    public class MonthFixedExpensesDtoValidator : AbstractValidator<MonthFixedExpensesDto>
    {
        public MonthFixedExpensesDtoValidator()
        {
            // RuleFor(x => x.Name).NotNull().NotEmpty().MaximumLength(150);
            RuleFor(x => x.Description).MaximumLength(150);
            RuleFor(x => x.Expiration).NotNull().NotEmpty();
            RuleFor(x => x.LinkCopyBill).MaximumLength(500);
            RuleFor(x => x.USERLinkCopyBill).MaximumLength(500);
            RuleFor(x => x.PASSLinkCopyBill).MaximumLength(500);
  
        }
    }
}