using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace Domain.Entities.Outsourced
{
    public class CollectDeliver
    {
        
        public int Id { get; set; }

        public string TransporterNoregisterd { get; set; }
        [ForeignKey("TransporterId")]
        public int? TransporterId { get; set; }
        public virtual Partner Transporter { get; set; }

        public string Subject { get; set; }
        //SOURCE
        [ForeignKey("SourceCustomerId")]
        public int? SourceCustomerId { get; set; }
        public virtual Customer SourceCustomer { get; set; }

        [ForeignKey("SourcePartnerId")]
        public int? SourcePartnerId { get; set; }
        public virtual Partner SourcePartner { get; set; }

        [ForeignKey("SourceCompanyId")]
        public int? SourceCompanyId { get; set; }
        public virtual Company SourceCompany { get; set; }

        public string SourceNoRegisterName { get; set; }
        public string SourceNoRegisterAddress { get; set; }
        
        [ForeignKey("DestinyCustomerId")]
        public int? DestinyCustomerId { get; set; }
        public virtual Customer DestinyCustomer { get; set; }

        [ForeignKey("DestinyPartnerId")]
        public int? DestinyPartnerId { get; set; }
        public virtual Partner DestinyPartner { get; set; }

        [ForeignKey("DestinyCompanyId")]
        public int? DestinyCompanyId { get; set; }
        public virtual Company DestinyCompany { get; set; }
        public string DestinyNoRegisterName { get; set; }
        public string DestinyNoRegisterAddress { get; set; }
        public DateTime Start { get; set; }
        public Decimal? Price { get; set; }
        public string Items { get; set; }
        public string Comments { get; set; }
    }
}
