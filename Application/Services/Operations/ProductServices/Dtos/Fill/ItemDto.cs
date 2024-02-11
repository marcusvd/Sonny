using System;
using System.Collections.Generic;
using Application.Services.Operations.Main.Companies.Dtos;

namespace Application.Services.Operations.ProductServices.Dtos.Fill
{

    public class ItemDto
    {

        public int Id { get; set; }
        public int CompanyId { get; set; }
        public CompanyDto Company { get; set; }
        public string Name { get; set; }
        public IEnumerable<ManufacturerDto> Manufacturers { get; set; }
        public IEnumerable<SegmentDto> Segments { get; set; }
        // public IEnumerable<ModelDto> Models { get; set; }
    }
}

