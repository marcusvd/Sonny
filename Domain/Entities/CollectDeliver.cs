using System;

namespace Domain.Entities
{
    public class CollectDeliver
    {
         public int Id { get; set; }
        public string TypeOfService { get; set; }
        public int TransporterId { get; set; }
        public Partner Transporter { get; set; }
        public string TransporterNoregisterd { get; set; }
        public DateTime Start { get; set; }
        public int Price { get; set; }
        public int SourceClientId { get; set; }
        public ClientEntity SourceClient { get; set; }
        public int SourcePartnerId { get; set; }
        public Partner SourcePartner { get; set; }
        public int DestinyClientId { get; set; }
        public ClientEntity DestinyClient { get; set; }
        public int DestinyPartnerId { get; set; }
        public Partner DestinyPartner { get; set; }
        public string NoRegisterName { get; set; }
        public string NoRegisterAddress { get; set; }
        public string Items { get; set; }
        public string Comments { get; set; }


    }
}
