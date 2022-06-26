using System;

namespace Services.Dto
{
    public class CollectDeliverDto
    {
         public int Id { get; set; }
        public string TransporterNoregisterd { get; set; }
        public int PartnerId { get; set; }
        public PartnerDto Transporter { get; set; }
        public int SourceAddressId { get; set; }
        public SourceCollectDeliverDto SourceAddress { get; set; }
        public int DestinyAddressId { get; set; }
        public DestinyCollectDeliverDto DestinyAddress { get; set; }
        public DateTime Start { get; set; }
        public int Price { get; set; }
        public string Items { get; set; }
        public string Comments { get; set; }
    }
}