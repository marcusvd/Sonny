using System;
using System.Collections.Generic;
using Domain.Entities.Main.Companies;

namespace Domain.Entities.Fill.StkProduct
{

    public class Item
    {
        public int Id { get; set; }
        public int CompanyId { get; set; }
        public Company Company { get; set; }
        public string Name { get; set; }
        public IEnumerable<Manufacturer> Manufacturers { get; set; }
        public IEnumerable<Segment> Segments { get; set; }
        // public IEnumerable<Model> Models { get; set; }
    }
}