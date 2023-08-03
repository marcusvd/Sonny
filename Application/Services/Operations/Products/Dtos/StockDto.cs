using System;
using System.Collections.Generic;

namespace Application.Services.Operations.Products.Dtos
{
    public class StockDto
    {
        public StockDto(int id)
        {
            Id = id;
        }
        public int Id { get; set; }
        public List<ProductDto> Products { get; set; }
    }
}