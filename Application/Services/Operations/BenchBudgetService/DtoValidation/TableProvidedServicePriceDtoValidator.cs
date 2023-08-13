using System;
using System.Collections.Generic;
using Application.Services.Operations.BenchBudgetService.Dtos;
using FluentValidation;

namespace Application.Services.Operations.BenchBudgetService.DtoValidation
{
    public class TableProvidedServicePriceDtoValidator: AbstractValidator<TableProvidedServicePriceDto>
    {
        public TableProvidedServicePriceDtoValidator()
        {
            
        }
    }
}
