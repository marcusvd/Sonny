using System;
using System.Collections.Generic;
using Domain.Entities;

namespace Application.Services.Operations.BenchBudgetService.Dtos
{
    public class TableProvidedServicePriceDto
    {
        public int Id { get; set; }
        public string ServiceName { get; set; }
        public Decimal PriceService { get; set; }
    }
}
