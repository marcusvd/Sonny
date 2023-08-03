using System;
using System.Collections.Generic;

namespace Application.Services.Operations.Products.Dtos
{
    public class ManufacturerDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public List<ProductDto> Products { get; set; }
    }
}