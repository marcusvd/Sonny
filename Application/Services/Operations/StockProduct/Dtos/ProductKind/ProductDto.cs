using System.Collections.Generic;
using Application.Services.Shared.Dtos;

namespace Application.Services.Operations.StockProduct.ProductKind
{

    public class ProductDto: RootBaseDto
    {
        public string Name { get; set; }
        public List<SegmentDto> Segments { get; set; }
        
        
    }
}