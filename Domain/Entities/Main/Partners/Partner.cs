using System.Collections.Generic;
using Domain.Entities.Outsourced;
using Domain.Entities.Stocks;
using Domain.Entities.Main.Inheritances;
using Domain.Entities.Main.Companies;

namespace Domain.Entities.Main
{
    public class Partner : MainEntitiesBase
    {
        public string BusinessLine { get; set; }
        public bool Transporter { get; set; }
        public bool HardwareSupplier { get; set; }
        public bool ElectronicRepair { get; set; }
        public List<CollectDeliver> CollectDeliversTransporters { get; set; }
        public virtual List<ElectronicRepair> ElectronicsRepairs { get; set; }

    }
}