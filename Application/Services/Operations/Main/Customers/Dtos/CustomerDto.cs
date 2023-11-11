using System;
using System.Collections.Generic;
using Application.Services.Operations.BenchBudgetService.Dtos;
using Application.Services.Operations.Inheritances;
using Application.Services.Operations.Inheritances.PartnetCustomer.Dtos;
using Application.Services.Operations.Main.Customers.Enums;
using Application.Services.Operations.Outsourced.Dtos;
using Application.Services.Operations.ProductServices.Dtos;

namespace Application.Services.Operations.Main.Customers.Dtos
{
    public class CustomerDto : MainEntitiesBaseDto
    {
        public bool Assured { get; set; }
        public TypeCustomerEnumDto CustomerType { get; set; }
        public decimal Payment { get; set; }
        public int Expiration { get; set; }
        public bool Disabled { get; set; }
        public decimal Discount { get; set; }
        public List<TrackingDto> Trackings { get; set; }
        public List<BudgetServiceDto> ServicesExecuted { get; set; }
        public List<ElectronicRepairDto> ElectronicsRepairs { get; set; }
    }
}