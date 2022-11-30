using System;
using Domain.Entities.Shared;
using System.Collections.Generic;
namespace Domain.Entities
{
    public class Partner
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public DateTime Registered { get; set; }
        public string CNPJ { get; set; }
        public string Responsible { get; set; }
        public string Comments { get; set; }
        public string BusinessLine { get; set; }
        public Address Address { get; set; }
        public Contact Contact { get; set; }
        public List<Inventory> Inventories { get; set; }
        public List<CollectDeliver> TransporterCollectDelivers { get; set; }
        public List<CollectDeliver> SourceCollectDelivers { get; set; }
        public List<CollectDeliver> DestinyCollectDelivers { get; set; }

    }
}