using System;

namespace Application.Dto.Outsourced
{
    public class CollectDeliverDto
    {
        public int Id { get; set; }
        public int TransporterId { get; set; }
        public PartnerDto Transporter { get; set; }
         public int CompanyId { get; set; }
        public CompanyDto Company { get; set; }
        public string Subject { get; set; }
        public string OwnerResponsible { get; set; }
        public ChargeFromDto ChargeFrom { get; set; }
        public bool Collect { get; set; }
        public bool Deliver { get; set; }
        public DateTime Start { get; set; }
        public Decimal Price { get; set; }
        public string ItemsCollected { get; set; }
        public string ItemsDelivered { get; set; }
        public string Comments { get; set; }
        public string TransporterNoregisterd { get; set; }

        public string Customer { get; set; }
        public string Partner { get; set; }

        public string NoRegisterName { get; set; }
        public string NoRegisterAddress { get; set; }
    }
}