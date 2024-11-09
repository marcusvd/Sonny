

using System.Collections.Generic;
using Domain.Entities.Main.Inheritances.Enums;
using Domain.Entities.Outsourced;
using Domain.Entities.Shared;
using Domain.Entities.StkProduct;

namespace Domain.Entities.Main.Inheritances
{
    public class MainEntitiesBase:RootBase
    {
        public string Name { get; set; }
        public string Responsible { get; set; }
        public string CNPJ { get; set; }
        public EntityTypeEnum EntityType { get; set; }
        public string Description { get; set; }
        public string BusinessLine { get; set; }
        public Address Address { get; set; }
        public Contact Contact { get; set; }
        public PhysicallyMovingCosts PhysicallyMovingCosts { get; set; }
        public List<Destiny> CollectDeliverDestinies { get; set; }
        public List<BillingFrom> BillingFromCollectsDelivers { get; set; }
        public List<Quantity> ProductsQuantities { get; set; }
    }


}
