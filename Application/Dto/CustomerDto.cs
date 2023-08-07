using System;
using System.Collections.Generic;
using Application.Dto.Outsourced;
using Application.Dto.Shared;
using Application.Services.Operations.Outsourced.Dtos;

namespace Application.Dto
{
    public class CustomerDto
    {
        public int Id { get; set; }
        public int CompanyId { get; set; }
        public virtual CompanyDto Company { get; set; }
        public string Name { get; set; }
        public string NormalizedName { get; set; }
        public string CNPJ { get; set; }
        public string Responsible { get; set; }
        public string Comments { get; set; }
        public bool Assured { get; set; }
        public bool CustomerType { get; set; }
        public decimal Payment { get; set; }
        public DateTime Registered { get; set; }
        public int Expiration { get; set; }
        public bool Disabled { get; set; }
        public bool ToBusinessBox { get; set; }
        public decimal Discount { get; set; }
        public AddressDto Address { get; set; }
        public ContactDto Contact { get; set; }
        public List<BillingFromDto> BillingFromCollectsDelivers { get; set; }
        public List<DestinyDto> Destinies { get; set; }
        public virtual List<ElectronicRepairDto> EletronicsRepairs { get; set; }
        // public virtual List<ServiceBudgetDto> ServicesBudgets { get; set; }
        // public virtual List<ServiceBenchDto> ServicesBenchs { get; set; }

    }
}