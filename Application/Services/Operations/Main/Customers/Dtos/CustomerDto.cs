using System;
using System.Collections.Generic;
using Application.Services.Operations.BenchBudgetService.Dtos;
using Application.Services.Operations.Inheritances;
using Application.Services.Operations.Inheritances.PartnetCustomer.Dtos;
using Application.Services.Operations.Outsourced.Dtos;
using Application.Services.Operations.Products.Dtos;

namespace Application.Services.Operations.Main.Customers.Dtos
{
    public class CustomerDto:MainEntitiesBaseDto
    {
        public bool Assured { get; set; }
        public bool CustomerType { get; set; }
        public decimal Payment { get; set; }
        public int Expiration { get; set; }
        public bool Disabled { get; set; }
        public bool ToBusinessBox { get; set; }
        public decimal Discount { get; set; }
        public List<TrackingDto> Trackings { get; set; }
        public List<BudgetServiceDto> ServicesExecuted { get; set; }
        public List<ElectronicRepairDto> ElectronicsRepairs { get; set; }
    }
}