using System;
using System.Collections.Generic;
using Application.Services.Operations.BenchBudgetService.Dtos;
using FluentValidation;

namespace Application.Services.Operations.BenchBudgetService.DtoValidation
{
    public class TableProvidedServicePriceDtoValidator : AbstractValidator<TableProvidedServicePriceDto>
    {
        public TableProvidedServicePriceDtoValidator()
        {
            RuleFor(x=>x.ServiceName).NotNull().NotEmpty().MaximumLength(250);
            RuleFor(x => x.PriceService).GreaterThanOrEqualTo(0);
        }
    }
}
