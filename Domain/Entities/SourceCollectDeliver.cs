using System;
using System.Collections.Generic;

namespace Domain.Entities
{
    public class SourceCollectDeliver
    {
        public int Id { get; set; }
        public int ClientId { get; set; }
        public ClientEntity Client { get; set; }
        public int PartnerId { get; set; }
        public Partner Partner { get; set; }
        public string NoRegisterName { get; set; }
        public string NoRegisterAddress { get; set; }
        // public int CollectDeliverId { get; set; }
        // public CollectDeliver CollectDeliver { get; set; }
        public List<CollectDeliver> CollectsDelivers { get; set; }

    }
}
