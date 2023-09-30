using System;
using System.Collections.Generic;
using Application.Services.Operations.Main.Companies.Dtos;
using Domain.Entities;

namespace Application.Services.Operations.BenchBudgetService.Dtos
{
    public class TableProvidedServicePriceDto
    {
        public int Id { get; set; }

        public int CompanyId { get; set; }
        public CompanyDto Company { get; set; }
        public string ServiceName { get; set; }
        public Decimal PriceService { get; set; }
    }
}
