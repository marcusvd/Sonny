using System;
using Application.Services.Operations.BenchBudgetService.Dtos;
using FluentValidation;

namespace Application.Services.Operations.BenchBudgetService.DtoValidation
{
    public class BudgetServiceDtoValidator : AbstractValidator<BudgetServiceDto>
    {
        public BudgetServiceDtoValidator()
        {
            RuleFor(x=>x.CompanyId).NotEmpty().NotNull().GreaterThan(0);
            RuleFor(x=>x.CustomerId).NotEmpty().NotNull().GreaterThan(0);
            RuleFor(x=>x.UserId).NotEmpty().NotNull().GreaterThan(0);
            RuleFor(x=>x.ProblemAccordingCustomer).NotEmpty().NotNull().MaximumLength(1000);
            RuleFor(x=>x.IsPresentVisuallyDescription).MaximumLength(1000);

            RuleFor(x=>x.DataDescription).MaximumLength(1000);
            RuleFor(x=>x.Service).SetValidator(new ServiceDtoValidator());
            RuleFor(x=>x.StatusService).NotEmpty().NotNull();
            RuleFor(x=>x.CollectsDeliversCosts).SetValidator(new CollectDeliverCostsDtoValidator());
            RuleFor(x=>x.EntryDate);
            RuleFor(x=>x.IsRemote);
        }
    }
}