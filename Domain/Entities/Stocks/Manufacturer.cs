using System;
using System.Collections.Generic;

namespace Domain.Entities.Stocks
{
    public class Manufacturer
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public List<Product> Products { get; set; }
        // public List<Equipament> Equipaments {get; set;}
    }
}