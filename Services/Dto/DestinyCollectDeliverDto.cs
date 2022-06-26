using System;
using System.Collections.Generic;

namespace Services.Dto
{
    public class DestinyCollectDeliverDto
    {
        public int Id { get; set; }
        public int DestinyClientId { get; set; }
        public ClientDto DestinyClient { get; set; }
        public int DestinyPartnerId { get; set; }
        public PartnerDto DestinyPartner { get; set; }
        public string NoRegisterName { get; set; }
        public string NoRegisterAddress { get; set; }
        public List<CollectDeliverDto> CollectsDelivers { get; set;}
    }
}
