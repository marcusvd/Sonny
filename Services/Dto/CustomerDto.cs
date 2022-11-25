using System;
using System.Collections.Generic;
using Services.Dto.CollectsDelivers;
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
        // public int AddressId { get; set; }
        public AddressDto Address { get; set; }
        // public int ContactId { get; set; }
        public ContactDto Contact { get; set; }
        public List<NetworkDevicesDto> NetWorkDevices { get; set; }
        public List<ServiceBudgetDto> ServicesBudgets { get; set; }
        public List<ServiceBenchDto> ServicesBenchs { get; set; }
        public List<CollectDeliverDto> SourceCollectDelivers { get; set; }
        public List<CollectDeliverDto> DestinyCollectDelivers { get; set; }

    }
}