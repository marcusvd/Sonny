using System;
using System.Collections.Generic;

namespace Domain.Entities
{
    public class DestinyCollectDeliver
    {
        public int Id { get; set; }
        public int DestinyClientId { get; set; }
        public ClientEntity DestinyClient { get; set; }
        public int DestinyPartnerId { get; set; }
        public Partner DestinyPartner { get; set; }
        public string NoRegisterName { get; set; }
        public string NoRegisterAddress { get; set; }
        public List<CollectDeliver> CollectsDelivers { get; set;}
    }
}
