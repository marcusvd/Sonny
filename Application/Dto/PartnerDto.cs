using System;
using System.Collections.Generic;
using Application.Dto.CollectsDelivers;
using Application.Dto.Outsourced;
using Application.Dto.Shared;

namespace Application.Dto
{
    public class PartnerDto
    {
        public int Id { get; set; }
        public int CompanyId { get; set; }
        public virtual CompanyDto Company { get; set; }
        public string Name { get; set; }
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
        public virtual List<CollectDeliverDto> CollectsDelivers { get; set; }
        public virtual List<ElectronicRepairDto> EletronicsRepairs { get; set; }
    }
}