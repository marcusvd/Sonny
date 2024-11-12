using System.Collections.Generic;
using Application.Services.Shared.Dtos;

namespace Application.Services.Operations.StockProduct
{
    public class StockDto: RootBaseDto
    {
        public ProductDto Product { get; set; }
        public List<ItemProductDto> ItemsProducts { get; set; }
       // public List<Sold> Solds { get; set; }
    }
}