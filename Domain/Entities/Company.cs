using System.Collections.Generic;
using Domain.Entities.Outsourced;
using Domain.Entities.Shared;

namespace Domain.Entities
{
    public class Company
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public Address Address { get; set; }
        public Contact Contact { get; set; }
        public List<CollectDeliver> CollectsDelivers { get; set; }

    }


}
