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
            RuleFor(x=>x.ExecutedServicesComments).MaximumLength(1000);
            // RuleFor(x=>x.IsAuthorized);
            RuleFor(x=>x.Start);
            RuleFor(x=>x.Finished);
            RuleFor(x=>x.AmountPrice);
            RuleFor(x=>x.CollectDeliveredPrice);
            RuleFor(x=>x.Prices);
        }
    }
}
