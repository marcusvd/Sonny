using System.Collections.Generic;
using Domain.Entities.Outsourced;
using Domain.Entities.Main.Inheritances;
using Domain.Entities.Main.Companies;
using Domain.Entities.Main.Enums;

namespace Domain.Entities.Main
{
    public class Partner : MainEntitiesBase
    {
        public string BusinessLine { get; set; }
        public TypePartnerEnum PartnerType { get; set; }

        public List<CollectDeliver> CollectDeliversTransporters { get; set; }
        public virtual List<ElectronicRepair> ElectronicsRepairs { get; set; }

    }
}