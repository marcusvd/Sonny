using System;
using System.Collections.Generic;
using Domain.Entities.Main.Companies;

namespace Domain.Entities.Fill.StkProduct
{
    public class Manufacturer_Fill
    {
        public int Id { get; set; }
        public string Manufacturer { get; set; }
        public int CompanyId { get; set; }
        public Company Company { get; set; }

    }
}