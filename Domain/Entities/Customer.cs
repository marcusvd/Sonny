using System.Collections.Generic;
using System;
using Domain.Entities.BudgetBench;
using System.ComponentModel.DataAnnotations;
using Domain.Entities.ApiSystem;

namespace Domain.Entities
{
 
    public class Customer
    {
        public int Id { get; set; }
        public string Name { get; set; }
        [MinLength(8)]
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
        public Address Address { get; set; }
        public Contact Contact { get; set; }
        public List<NetworkDevice> NetworksDevices { get; set; }
        public List<ServiceBudget> ServicesBudgets { get; set; }
        public List<ServiceBench> ServicesBenchs { get; set; }
        public virtual List<CollectDeliver> SourceCollectDelivers { get; set; }
        public virtual List<CollectDeliver> DestinyCollectDelivers { get; set; }
        // public List<SourceCollectDeliver> SourceCollectDelivers { get; set;}
        // public List<DestinyCollectDeliver> DestinyCollectDelivers { get; set;}
    }
}
