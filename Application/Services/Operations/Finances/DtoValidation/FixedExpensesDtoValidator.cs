
using FluentValidation;

namespace Application.Services.Operations.Finances.Dtos
{
    public class FixedExpensesDtoValidator : AbstractValidator<FixedExpensesDto>
    {
        public FixedExpensesDtoValidator()
        {
            RuleFor(x => x.Name).NotNull().NotEmpty().MaximumLength(150);
            RuleFor(x => x.NameIdentification).MaximumLength(150);
            RuleFor(x => x.Expiration).NotNull().NotEmpty();
            RuleFor(x => x.LinkCopyBill).MaximumLength(500);
            RuleFor(x => x.USERLinkCopyBill).MaximumLength(500);
            RuleFor(x => x.PASSLinkCopyBill).MaximumLength(500);
            RuleFor(x => x.CyclePayment);
        }
    }
}