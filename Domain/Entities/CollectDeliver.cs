using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace Domain.Entities
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
        [ForeignKey("SourceClientId")]
        public int? SourceClientId { get; set; }
        public virtual ClientEntity SourceClient { get; set; }

        [ForeignKey("SourcePartnerId")]
        public int? SourcePartnerId { get; set; }
        public virtual Partner SourcePartner { get; set; }

        [ForeignKey("SourceCompanyId")]
        public int? SourceCompanyId { get; set; }
        public virtual Company SourceCompany { get; set; }

        public string SourceNoRegisterName { get; set; }
        public string SourceNoRegisterAddress { get; set; }
        //DESTINY
        [ForeignKey("DestinyClientId")]
        public int? DestinyClientId { get; set; }
        public virtual ClientEntity DestinyClient { get; set; }

        [ForeignKey("DestinyPartnerId")]
        public int? DestinyPartnerId { get; set; }
        public virtual Partner DestinyPartner { get; set; }

        [ForeignKey("DestinyCompanyId")]
        public int? DestinyCompanyId { get; set; }
        public virtual Company DestinyCompany { get; set; }

        public string DestinyNoRegisterName { get; set; }
        public string DestinyNoRegisterAddress { get; set; }

        public DateTime Start { get; set; }
        public int? Price { get; set; }
        public string Items { get; set; }
        public string Comments { get; set; }
    }
}
