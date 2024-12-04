using System.Collections.Generic;
using Application.Services.Shared.Dtos;

namespace Application.Services.Operations.StockProduct.ProductKind
{

    public class ProductTypeDto: RootBaseDto
    {
        public string Name { get; set; }
        public List<SegmentDto> Segments { get; set; }
         public List<ProductDto> Products { get; set; }
        
        
    }
}