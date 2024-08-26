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
        // public Partner() { }
        // public Partner(
        //             int companyId,
        //             string name,
        //             string responsible,
        //             string cnpj,
        //             EntityTypeEnum entityType,
        //             DateTime registered,
        //             string description,
        //             string businessLine,
        //             Address address,
        //             Contact contact,
        //             PartnerBusinessEnum partnerBusiness,
        //             PhysicallyMovingCosts physicallyMovingCosts,
        //             PaymentData paymentData
        //             )
        // {
        //     CompanyId = companyId;
        //     Name = name;
        //     Responsible = responsible;
        //     CNPJ = cnpj;
        //     EntityType = entityType;
        //     Registered = registered;
        //     Description = description;
        //     BusinessLine = businessLine;
        //     Address = address;
        //     Contact = contact;
        //     PartnerBusiness = partnerBusiness;
        //     PhysicallyMovingCosts = physicallyMovingCosts;
        //     PaymentsData = paymentData;
        // }

        public PaymentData PaymentsData { get; set; }
        public PartnerBusinessEnum PartnerBusiness { get; set; }
        public List<CollectDeliver> CollectDeliversTransporters { get; set; }
        public virtual List<ElectronicRepair> ElectronicsRepairs { get; set; }

    }
}