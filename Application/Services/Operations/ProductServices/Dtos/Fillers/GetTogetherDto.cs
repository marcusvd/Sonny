using System;
using System.Collections.Generic;
using Application.Services.Operations.Main.Companies.Dtos;

namespace Application.Services.Operations.ProductServices.Dtos.Fill
{
    public class GetTogetherDto
    {
        public List<Equipament_FillDto> Equipaments_Fill { get; set; }
        public List<Manufacturer_FillDto> Manufacturers_Fill { get; set; }
        public List<Segment_FillDto> Segments_Fill { get; set; }
    }
}