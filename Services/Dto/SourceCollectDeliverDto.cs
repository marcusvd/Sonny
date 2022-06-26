using System;
using System.Collections.Generic;

namespace Services.Dto
{
    public class SourceCollectDeliverDto
    {
        public int Id { get; set; }
        public int SourceClientId { get; set; }
        public ClientDto SourceClient { get; set; }
        public int SourcePartnerId { get; set; }
        public PartnerDto SourcePartner { get; set; }
        public string NoRegisterName { get; set; }
        public string NoRegisterAddress { get; set; }
        public List<CollectDeliverDto> CollectsDelivers { get; set; }

    }
}
