using System;
using System.Collections.Generic;

namespace Application.Dto.Stocks
{
    public class EquipamentTypeDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public List<ProductDto> Products { get; set; }
    }
}