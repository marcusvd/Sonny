using System;

namespace Services.Dto
{
    public class CollectDeliverDto
    {
        public int Id { get; set; }

        public string TransporterNoregisterd { get; set; }

        public int? TransporterId { get; set; }
        public PartnerDto Transporter { get; set; }
        public string Subject { get; set; }
        //SOURCE
        public int? SourceClientId { get; set; }
        public ClientDto SourceClient { get; set; }
        public int? SourcePartnerId { get; set; }
        public PartnerDto SourcePartner { get; set; }
        public int? SourceCompanyId { get; set; }
        public CompanyDto SourceCompany { get; set; }
        public string SourceNoRegisterName { get; set; }
        public string SourceNoRegisterAddress { get; set; }
        //DESTINY
        public int? DestinyClientId { get; set; }
        public ClientDto DestinyClient { get; set; }
        public int? DestinyPartnerId { get; set; }
        public PartnerDto DestinyPartner { get; set; }
         public int? DestinyCompanyId { get; set; }
        public CompanyDto DestinyCompany { get; set; }
        public string DestinyNoRegisterName { get; set; }
        public string DestinyNoRegisterAddress { get; set; }

        public DateTime Start { get; set; }
        public int? Price { get; set; }
        public string Items { get; set; }
        public string Comments { get; set; }
    }
}