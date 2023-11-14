using System;
using System.Collections.Generic;
using Application.Services.Operations.Main.Companies.Dtos;

namespace Application.Services.Operations.ProductServices.Dtos
{
    public class EquipamentGridDto
    {
        public int ProductId { get; set; }
        public string Name { get; set; }
        public string Manufacturer { get; set; }
        public string Segment { get; set; }
        public string Model { get; set; }
        public string Description { get; set; }
        public int Quantities { get; set; }
    }
}