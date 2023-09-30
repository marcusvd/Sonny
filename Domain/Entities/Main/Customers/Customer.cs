using System.Collections.Generic;
using Domain.Entities.Outsourced;
using Domain.Entities.Product;
using Domain.Entities.ServicesBench;
using Domain.Entities.Main.Inheritances;
using Domain.Entities.Main.Enums;

namespace Domain.Entities.Main.Customers
{

    public class Customer : MainEntitiesBase
    {
        public bool Assured { get; set; }
        public TypeCustomerEnum CustomerType { get; set; }
        public decimal Payment { get; set; }
        public int Expiration { get; set; }
        public bool Disabled { get; set; }
        public decimal Discount { get; set; }
        public List<Tracking> Trackings { get; set; }
        public List<BudgetService> ServicesExecuted { get; set; }
        public List<ElectronicRepair> ElectronicsRepairs { get; set; }
    }
}
