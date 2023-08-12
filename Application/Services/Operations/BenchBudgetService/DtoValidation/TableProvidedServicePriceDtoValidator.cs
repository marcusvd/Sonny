using System;
using System.Collections.Generic;
using Domain.Entities;
using FluentValidation;

namespace Application.Services.Operations.BenchBudgetService.Dtos
{
    public class TableProvidedServicePriceDtoValidator: AbstractValidator<TableProvidedServicePriceDto>
    {
        public TableProvidedServicePriceDtoValidator()
        {
            
        }
    }
}
