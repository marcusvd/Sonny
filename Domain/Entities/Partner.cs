using System;
using System.Collections.Generic;

namespace Domain.Entities
{
    public class Partner
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public DateTime Today { get; set; }
        public string CNPJ { get; set; }
        public string Responsible { get; set; }
        public string Comments { get; set; }
        public string BusinessLine { get; set; }
        public Address Address { get; set; }
        public int AddressId { get; set; }
        public Contact Contact { get; set; }
        public int ContactId { get; set; }
        public List<CollectDeliver> CollectsDelivers { get; set; }
        public string ToSeach { get; set; }

    }
}