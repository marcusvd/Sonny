using System;
using System.Collections.Generic;
using Application.Dto.Outsourced;
using Application.Dto.Shared;
using Application.Services.Operations.Outsourced.Dtos;

namespace Application.Dto
{
    public class PartnerDto
    {
        public int Id { get; set; }
        public int CompanyId { get; set; }
        public virtual CompanyDto Company { get; set; }
        public string Name { get; set; }
        public string NormalizedName { get; set; }
        public DateTime Registered { get; set; }
        public string CNPJ { get; set; }
        public string Responsible { get; set; }
        public string Comments { get; set; }
        public string Businessline { get; set; }
        public bool Transporter { get; set; }
        public bool HardwareSupplier { get; set; }
        public bool EletronicRepair { get; set; }
        public AddressDto Address { get; set; }
        public ContactDto Contact { get; set; }
        public List<CollectDeliverDto> CollectDelivers { get; set; }
        public List<BillingFromDto> BillingFromCollectsDelivers { get; set; }
        public List<DestinyDto> Destinies { get; set; }
        public virtual List<ElectronicRepairDto> EletronicsRepairs { get; set; }
    }
}