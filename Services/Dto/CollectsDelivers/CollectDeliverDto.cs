using System;

namespace Services.Dto.CollectsDelivers
{
    public class CollectDeliverDto
    {
        public int Id { get; set; }

        public string TransporterNoregisterd { get; set; }

        public int? TransporterId { get; set; }
        public PartnerDto Transporter { get; set; }
        public string Subject { get; set; }
        //SOURCE
        public int? SourceCustomerId { get; set; }
        public CustomerDto SourceCustomer { get; set; }
        public int? SourcePartnerId { get; set; }
        public PartnerDto SourcePartner { get; set; }
        public int? SourceCompanyId { get; set; }
        public CompanyDto SourceCompany { get; set; }
        public string SourceNoRegisterName { get; set; }
        public string SourceNoRegisterAddress { get; set; }
        //DESTINY
        public int? DestinyCustomerId { get; set; }
        public CustomerDto DestinyCustomer { get; set; }
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