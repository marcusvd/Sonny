using System;
using Domain.Entities;
using FluentValidation;

namespace Application.Services.Operations.BenchBudgetService.Dtos
{
    public class PriceDtoValidator : AbstractValidator<PriceDto>
    {
        public PriceDtoValidator()
        {
            RuleFor(x => x.ServiceName);
            RuleFor(x => x.PriceService);
        }
    }
}
