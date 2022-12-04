using System;
using System.Collections.Generic;
using Services.Dto.CollectsDelivers;
using Services.Dto.Outsourced;
using Services.Dto.ServiceBudgetBench;

namespace Services.Dto
{
    public class CustomerDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
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
        public virtual List<NetworkDevicesDto> NetWorksDevices { get; set; }
        public virtual List<EletronicRepairDto> EletronicsRepairs { get; set; }
        public virtual List<ServiceBudgetDto> ServicesBudgets { get; set; }
        public virtual List<ServiceBenchDto> ServicesBenchs { get; set; }
        public virtual List<CollectDeliverDto> SourceCollectDelivers { get; set; }
        public virtual List<CollectDeliverDto> DestinyCollectDelivers { get; set; }

    }
}