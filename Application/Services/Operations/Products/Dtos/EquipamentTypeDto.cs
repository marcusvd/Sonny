using System;
using System.Collections.Generic;

namespace Application.Services.Operations.Products.Dtos
{
    public class EquipamentTypeDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public List<ProductDto> Products { get; set; }
    }
}