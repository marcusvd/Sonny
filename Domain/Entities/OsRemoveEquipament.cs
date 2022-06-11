using System;
using System.Collections.Generic;

namespace Domain.Entities
{
    public class OsRemoveEquipament
    {
        public int Id { get; set; }
        public DateTime Start { get; set; }
        public string Status { get; set; }
        public string User { get; set; }
        public ClientEntity Clients {get; set;}
        public string Model { get; set; }
        public string EquipamentDescription { get; set; }
        public string UserConsiderations { get; set; }
         public string FoundedErrors { get; set; }
         public string AppliedSolutions { get; set; }
        public DateTime End { get; set; }
        // public int AddressId { get; set; }
        // public Address Address { get; set; }
        // public int ContactId { get; set; }
        // public Contact Contact { get; set; }
    }
}