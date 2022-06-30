using System;

namespace Domain.Entities
{
    public class CollectDeliver
    {
        public int Id { get; set; }

        public string TransporterNoregisterd { get; set; }

        public int? TransporterId { get; set; }
        public Partner Transporter { get; set; }

        public int SourceAddressId { get; set; }
        public SourceCollectDeliver SourceAddress { get; set; }


        public int DestinyAddressId { get; set; }
        public DestinyCollectDeliver DestinyAddress { get; set; }


        public DateTime Start { get; set; }
        public int Price { get; set; }
        public string Items { get; set; }
        public string Comments { get; set; }
    }
}
