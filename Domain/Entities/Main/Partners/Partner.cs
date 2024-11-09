using System.Collections.Generic;
using Domain.Entities.Outsourced;
using Domain.Entities.Main.Inheritances;
using Domain.Entities.Main.Inheritances.Enums;
using Domain.Entities.Main.Partners.Enums;
using System;
using Domain.Entities.Shared;

namespace Domain.Entities.Main
{
    public class Partner : MainEntitiesBase
    {
        public PaymentData PaymentsData { get; set; }
        public PartnerBusinessEnum PartnerBusiness { get; set; }
        public List<CollectDeliver> CollectDeliversTransporters { get; set; }
        public virtual List<ElectronicRepair> ElectronicsRepairs { get; set; }

    }
}