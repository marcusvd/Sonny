using System;
using System.Collections.Generic;
using Services.Dto.CollectsDelivers;

namespace Services.Dto
{
    public class SourceCollectDeliverDto
    {
        public int Id { get; set; }
        public int CustomerId { get; set; }
        public CustomerDto Customer { get; set; }
        public int PartnerId { get; set; }
        public PartnerDto Partner { get; set; }
        public string NoRegisterName { get; set; }
        public string NoRegisterAddress { get; set; }
        // public int CollectDeliverId { get; set; }
        // public CollectDeliverDto CollectDeliver { get; set; }
        public List<CollectDeliverDto> CollectsDelivers { get; set; }

    }
}
