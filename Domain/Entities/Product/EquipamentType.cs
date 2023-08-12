using System;
using System.Collections.Generic;

namespace Domain.Entities.Stocks
{
    public class EquipamentType
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public List<Product> Products { get; set; }
    }
}