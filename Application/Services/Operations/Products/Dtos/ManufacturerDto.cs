using System;
using System.Collections.Generic;
using Application.Services.Operations.Main.Companies.Dtos;

namespace Application.Services.Operations.Products.Dtos
{
    public class ManufacturerDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int CompanyId { get; set; }
        public CompanyDto Company { get; set; }
        public List<ProductDto> Products { get; set; }
    }
}