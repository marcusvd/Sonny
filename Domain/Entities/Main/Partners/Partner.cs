using System.Collections.Generic;
using Domain.Entities.Outsourced;
using Domain.Entities.Main.Inheritances;
using Domain.Entities.Main.Companies;
using Domain.Entities.Main.Enums;
using System;
using Domain.Entities.Shared;

namespace Domain.Entities.Main
{
    public class Partner : MainEntitiesBase
    {
        public Partner() { }
        public Partner(
                    int companyId,
                    string name,
                    string responsible,
                    string cnpj,
                    DateTime registered,
                    string description,
                    string businessLine,
                    Address address,
                    Contact contact,
                    TypePartnerEnum partnerType,
                    PhysicallyMovingCosts physicallyMovingCosts,
                    PaymentData paymentData
                    )
        {
            CompanyId = companyId;
            Name = name;
            Responsible = responsible;
            CNPJ = cnpj;
            Registered = registered;
            Description = description;
            BusinessLine = businessLine;
            Address = address;
            Contact = contact;
            PartnerType = partnerType;
            PhysicallyMovingCosts = physicallyMovingCosts;
            PaymentsData = paymentData;
        }

        public PaymentData PaymentsData { get; set; }
        public TypePartnerEnum PartnerType { get; set; }
        public List<CollectDeliver> CollectDeliversTransporters { get; set; }
        public virtual List<ElectronicRepair> ElectronicsRepairs { get; set; }

    }
}