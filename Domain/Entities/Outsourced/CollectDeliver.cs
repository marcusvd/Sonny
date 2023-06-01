using System;
using System.ComponentModel.DataAnnotations.Schema;
namespace Domain.Entities.Outsourced
{
    public class CollectDeliver
    {
        public int Id { get; set; }

        [ForeignKey("TransporterId")]
        public int? TransporterId { get; set; }
        public virtual Partner Transporter { get; set; }

        [ForeignKey("CompanyId")]
        public int CompanyId { get; set; }
        public virtual Company Company { get; set; }
        public string Subject { get; set; }
        public string OwnerResponsible { get; set; }
        public ChargeForm ChargeForm { get; set; }
        public bool Collect { get; set; }
        public bool Deliver { get; set; }
        public DateTime Start { get; set; }
        public Decimal Price { get; set; }
        public string ItemsCollected { get; set; }
        public string ItemsDelivered { get; set; }
        public string Comments { get; set; }
        public string Customer { get; set; }
        public string Partner { get; set; }

        public string NoRegisterName { get; set; }
        public string NoRegisterAddress { get; set; }
    }
}
