using System.Collections.Generic;
using Domain.Entities.Outsourced;
using Domain.Entities.Shared;

namespace Domain.Entities.Authentication
{
    public class Company
    {
        public Company(string name)
        {
            Name = name;
        }

        public int Id { get; set; }
        public string Name { get; set; }
        public Address Address { get; set; }
        public Contact Contact { get; set; }
        public List<MyUser> MyUsers { get; set; }
        public List<CollectDeliver> CollectsDelivers { get; set; }


  

    }


}
