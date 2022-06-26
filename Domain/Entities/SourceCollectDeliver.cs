using System;
using System.Collections.Generic;

namespace Domain.Entities
{
    public class SourceCollectDeliver
    {
        public int Id { get; set; }
        public int SourceClientId { get; set; }
        public ClientEntity SourceClient { get; set; }
        public int SourcePartnerId { get; set; }
        public Partner SourcePartner { get; set; }
        public string NoRegisterName { get; set; }
        public string NoRegisterAddress { get; set; }
        public List<CollectDeliver> CollectsDelivers { get; set; }

    }
}
