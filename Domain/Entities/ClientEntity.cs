using System.Collections.Generic;
using System;


namespace Domain.Entities
{
    public class ClientEntity
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string CNPJ { get; set; }
        public string Responsible { get; set; }
        public string Comments { get; set; }
        public bool Assured { get; set; }
        public string ClientType { get; set; }
        public decimal Payment { get; set; }
        public DateTime Expiration { get; set; }
        public bool Disabled { get; set; }
        public bool ToBusinessBox { get; set; }
        public decimal Discount { get; set; }
        public int AddressId { get; set; }
        public Address Address { get; set; }
        public int ContactId { get; set; }
        public Contact Contact { get; set; }
        public List<NetworkDevice> NetworksDevices { get; set; }
        public List<ServiceBudget> ServicesBudgets { get; set; }
        public virtual List<CollectDeliver> SourceCollectDelivers { get; set; }
        public virtual List<CollectDeliver> DestinyCollectDelivers { get; set; }
        // public List<SourceCollectDeliver> SourceCollectDelivers { get; set;}
        // public List<DestinyCollectDeliver> DestinyCollectDelivers { get; set;}
        public string ToSeach { get; set; }
    }
}
