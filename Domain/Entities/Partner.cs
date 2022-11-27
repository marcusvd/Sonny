using System;
using Domain.Entities.Shared;
using System.Collections.Generic;
namespace Domain.Entities
{
    public class Partner
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public DateTime Today { get; set; }
        public string CNPJ { get; set; }
        public string Responsible { get; set; }
        public string Comments { get; set; }
        public string BusinessLine { get; set; }
        public bool Transporter { get; set; }
        public bool Supplier { get; set; }
        public Address Address { get; set; }
        public int AddressId { get; set; }
        public Contact Contact { get; set; }
        public int ContactId { get; set; }
        public List<Inventory> Inventories { get; set; }
        public List<CollectDeliver> TransporterCollectDelivers { get; set; }
        public List<CollectDeliver> SourceCollectDelivers { get; set; }
        public List<CollectDeliver> DestinyCollectDelivers { get; set; }

    }
}