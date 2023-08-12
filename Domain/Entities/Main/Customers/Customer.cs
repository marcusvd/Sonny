using System.Collections.Generic;
using Domain.Entities.Outsourced;
using Domain.Entities.Stocks;
using Domain.Entities.ServicesBench;
using Domain.Entities.Main.Inheritances;

namespace Domain.Entities.Main.Customers
{

    public class Customer : MainEntitiesBase
    {
        public bool Assured { get; set; }
        public bool CustomerType { get; set; }
        public decimal Payment { get; set; }
        public int Expiration { get; set; }
        public bool Disabled { get; set; }
        public bool ToBusinessBox { get; set; }
        public decimal Discount { get; set; }
        public List<Tracking> Trackings { get; set; }
        public List<BudgetService> ServicesExecuted { get; set; }
        public List<ElectronicRepair> ElectronicsRepairs { get; set; }
    }
}
