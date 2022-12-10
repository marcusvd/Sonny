using System;

namespace Services.Dto.CollectsDelivers
{
    public class CollectDeliverDto
    {
        public int Id { get; set; }
        public string Subject { get; set; }
        public bool Collect { get; set; }
        public bool Deliver { get; set; }
        public DateTime Start { get; set; }
        public Decimal Price { get; set; }
        public string ItemsCollected { get; set; }
        public string ItemsDelivered { get; set; }
        public string Comments { get; set; }
        public string TransporterNoregisterd { get; set; }
        
        public int? TransporterId { get; set; }
        public virtual PartnerDto Transporter { get; set; }

        public int? CustomerId { get; set; }
        public virtual CustomerDto Customer { get; set; }

        public int? PartnerId { get; set; }
        public virtual PartnerDto Partner { get; set; }

        public int? CompanyId { get; set; }
        public virtual CompanyDto Company { get; set; }
        public string NoRegisterName { get; set; }
        public string NoRegisterAddress { get; set; }
    }
}