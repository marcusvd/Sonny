using System;
using Domain.Entities.Authentication;
using FluentValidation;

namespace Application.Services.Operations.BenchBudgetService.Dtos
{
    public class BudgetServiceDtoValidator : AbstractValidator<BudgetServiceDto>
    {
        public BudgetServiceDtoValidator()
        {
            RuleFor(x=>x.ProblemAccordingCustomer).NotEmpty().NotNull().MaximumLength(1000);
            RuleFor(x=>x.IsPresentVisuallyDescription).MaximumLength(1000);
            RuleFor(x=>x.DataDescription).MaximumLength(1000);
            RuleFor(x=>x.EntryDate).NotEmpty().NotNull();
            RuleFor(x=>x.Service).SetValidator(new ServiceDtoValidator());
            RuleFor(x=>x.StatusService).NotEmpty().NotNull();
        }
    }
}
