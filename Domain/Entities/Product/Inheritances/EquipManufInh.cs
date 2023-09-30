using System;
using System.Collections.Generic;
using Domain.Entities.Main.Companies;

namespace Domain.Entities.Product
{
    public class EquipManufInh
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string NormalizedName { get; set; }
        public int CompanyId { get; set; }
        public Company Company { get; set; }
        public List<Product> Products { get; set; }
    }
}