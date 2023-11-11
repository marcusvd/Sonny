using System;
using System.Collections.Generic;
using Domain.Entities.Main;
using Domain.Entities.Main.Companies;

namespace Domain.Entities.StkProduct
{
    public class Product
    {
        public int Id { get; set; }
        public int CompanyId { get; set; }
        public Company Company { get; set; }
        public Equipament Equipament { get; set; }
        public List<Quantity> Quantities { get; set; }
        public List<Tracking> Trackings { get; set; }
    }
}