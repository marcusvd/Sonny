using Domain.Entities.Main.Inheritances;
using Domain.Entities.Main.Inheritances.Enums;
using System;
using Domain.Entities.Shared;

namespace Domain.Entities.Main.Customers
{

    public class Customer : MainEntitiesBase
    {
        public Customer()
        {

        }
        public Customer(
                    int companyId,
                    string name,
                    string responsible,
                    string cnpj,
                    DateTime registered,
                    string description,
                    string businessLine,
                    Address address,
                    Contact contact,
                    DateTime assured,
                    decimal payment,
                    DateTime expires,
                    DateTime deleted,
                    decimal discount,
                    AdditionalCosts additionalCosts,
                    EntityTypeEnum entityType,
                    PhysicallyMovingCosts physicallyMovingCosts
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
            Assured = assured;
            Payment = payment;
            Expires = expires;
            Deleted = deleted;
            Discount = discount;
            AdditionalCosts = additionalCosts;
            EntityType = entityType;
            PhysicallyMovingCosts = physicallyMovingCosts;
        }
        public DateTime Assured { get; set; }
        public decimal Payment { get; set; }
        public DateTime Expires { get; set; }
        public decimal Discount { get; set; }
        public AdditionalCosts AdditionalCosts { get; set; }
        // public List<Tracking> Trackings { get; set; }
        // public List<BudgetService> ServicesExecuted { get; set; }
        // public List<ElectronicRepair> ElectronicsRepairs { get; set; }
    }

}
