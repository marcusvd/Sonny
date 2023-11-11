using System;
using System.Collections.Generic;
using Domain.Entities.Main.Companies;

namespace Domain.Entities.StkProduct
{
    public class Equipament
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Manufacturer { get; set; }
        public string Segment { get; set; }
        public string Model { get; set; }
        public string Description { get; set; }
    }
}