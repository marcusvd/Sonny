using System;
using System.Collections.Generic;
using Domain.Entities.Main.Companies;

namespace Domain.Entities.Fill.StkProduct
{
    public class Equipament_Fill
    {
        public int Id { get; set; }
        public string Equipament { get; set; }
        public int CompanyId { get; set; }
        public Company Company { get; set; }

    }
}