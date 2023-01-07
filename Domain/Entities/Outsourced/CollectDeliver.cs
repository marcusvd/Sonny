using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace Domain.Entities.Outsourced
{
    public class CollectDeliver
    {

        public int Id { get; set; }
        public string Subject { get; set; }
        public string OwnerResponsible  { get; set; }
        public bool Collect { get; set; }
        public bool Deliver { get; set; }
        public DateTime Start { get; set; }
        public Decimal Price { get; set; }
        public string ItemsCollected { get; set; }
        public string ItemsDelivered { get; set; }
        public string Comments { get; set; }
        public string TransporterNoregisterd { get; set; }
        
        [ForeignKey("TransporterId")]
        public int? TransporterId { get; set; }
        public virtual Partner Transporter { get; set; }

        [ForeignKey("CustomerId")]
        public int? CustomerId { get; set; }
        public virtual Customer Customer { get; set; }

        [ForeignKey("PartnerId")]
        public int? PartnerId { get; set; }
        public virtual Partner Partner { get; set; }

        [ForeignKey("CompanyId")]
        public int? CompanyId { get; set; }
        public virtual Company Company { get; set; }
        public string NoRegisterName { get; set; }
        public string NoRegisterAddress { get; set; }


        // public string TransporterNoregisterd { get; set; }
        // [ForeignKey("TransporterId")]
        // public int? TransporterId { get; set; }
        // public virtual Partner Transporter { get; set; }

        // 
        // //SOURCE
        // [ForeignKey("SourceCustomerId")]
        // public int? SourceCustomerId { get; set; }
        // public virtual Customer SourceCustomer { get; set; }

        // [ForeignKey("SourcePartnerId")]
        // public int? SourcePartnerId { get; set; }
        // public virtual Partner SourcePartner { get; set; }

        // [ForeignKey("SourceCompanyId")]
        // public int? SourceCompanyId { get; set; }
        // public virtual Company SourceCompany { get; set; }

        // public string SourceNoRegisterName { get; set; }
        // public string SourceNoRegisterAddress { get; set; }


    }
}