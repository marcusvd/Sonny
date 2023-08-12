using System;
using System.Collections.Generic;
using Domain.Entities.Authentication;
using FluentValidation;

namespace Application.Services.Operations.BenchBudgetService.Dtos
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
            RuleFor(x=>x.CollectPrice);
            RuleFor(x=>x.DeliveredtPrice);
            RuleFor(x=>x.Prices);
        }
    }
}
