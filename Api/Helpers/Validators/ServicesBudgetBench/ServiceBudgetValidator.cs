using FluentValidation;
using Services.Dto.ServiceBudgetBench;

namespace Api.Helpers.Validators.ServicesBudgetBench
{
    public class ServiceBudgetValidator : AbstractValidator<ServiceBudgetDto>
    {
        public ServiceBudgetValidator()
        {
            When(xx => string.IsNullOrEmpty(xx.RemoteAccessData), () =>
            {
                RuleFor(xx => xx.Visually).NotEmpty().NotNull().MaximumLength(500);
            }).Otherwise(() =>
            {
                RuleFor(xx => xx.RemoteAccessData).NotEmpty().NotNull().MaximumLength(500);
            });

            RuleFor(xx => xx.BudgetStartedIn).NotEmpty().NotNull();
            RuleFor(xx => xx.CustomerProblems).NotEmpty().NotNull().MaximumLength(500);
            RuleFor(xx => xx.Status).NotEmpty().NotNull().MaximumLength(100);
        }
    }
}
