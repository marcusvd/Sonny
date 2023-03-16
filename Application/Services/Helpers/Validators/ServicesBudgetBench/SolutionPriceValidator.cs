using FluentValidation;
using Application.Dto.ServiceBudgetBench;

namespace Application.Services.Helpers.Validators.ServicesBudgetBench
{
    public class SolutionPriceValidator : AbstractValidator<SolutionPriceDto>
    {
        public SolutionPriceValidator()
        {
            RuleFor(xx => xx.Technician).NotEmpty().NotNull().MaximumLength(500);
            RuleFor(xx => xx.PriceService).ScalePrecision(2, 8);
            RuleFor(xx => xx.ProblemByTechnician).NotEmpty().NotNull().MaximumLength(500);
            RuleFor(xx => xx.TechnicalSolution).NotEmpty().NotNull().MaximumLength(500);
            RuleFor(xx => xx.Remote);
            RuleFor(xx => xx.Approved);
        }
    }
}