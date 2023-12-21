using System;
using System.Collections.Generic;
using Application.Services.Operations.BenchBudgetService.Dtos;
using FluentValidation;

namespace Application.Services.Operations.BenchBudgetService.DtoValidation
{
    public class ServiceDtoValidator : AbstractValidator<ServiceDto>
    {
        public ServiceDtoValidator()
        {
            RuleFor(x=>x.Comments).MaximumLength(1000);

            RuleFor(x=>x.Finished);
            // RuleFor(x=>x.AmountPrice);
            RuleForEach(x=>x.Repairs).SetValidator(new RepairDtoValidator());
        }
    }
}
