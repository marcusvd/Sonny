using System;
using System.Collections.Generic;

namespace Domain.Entities
{
    public class Company
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int AddressId { get; set; }
        public Address Address { get; set; }
        public int ContactId { get; set; }
        public Contact Contact { get; set; }
        public List<CollectDeliver> SourceCollectsDelivers { get; set; }
        public List<CollectDeliver> DestinyCollectsDelivers { get; set; }
    }


}
