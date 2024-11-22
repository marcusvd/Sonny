using System.Collections.Generic;
using Application.Services.Shared.Dtos;

namespace Application.Services.Operations.StockProduct.ProductKind
{
    public class SegmentDto : RootBaseDto
    {
        public string Name { get; set; }
        public int ProductId { get; set; }
        public ProductDto Product { get; set; }
        public List<ManufacturerDto> Manufacturers { get; set; }


    }
}