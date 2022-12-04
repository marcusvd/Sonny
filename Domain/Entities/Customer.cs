using System.Collections.Generic;
using System;
using Domain.Entities.BudgetBench;
using Domain.Entities.Shared;
using Domain.Entities.Outsourced;

namespace Domain.Entities
{
 
    public class Customer
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
        public Address Address { get; set; }
        public Contact Contact { get; set; }
       
        public virtual List<EletronicRepair> EletronicsRepairs { get; set; }
        public virtual List<NetworkDevice> NetworksDevices { get; set; }
        public virtual List<ServiceBudget> ServicesBudgets { get; set; }
        public virtual List<ServiceBench> ServicesBenchs { get; set; }
        public virtual List<CollectDeliver> SourceCollectDelivers { get; set; }
        public virtual List<CollectDeliver> DestinyCollectDelivers { get; set; }
    }
}
