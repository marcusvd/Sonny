using System.Collections.Generic;
using Application.Services.Shared.Dtos;



namespace Application.Services.Operations.StockProduct.ProductKind
{
    public class ManufacturerDto: RootBaseDto
    {
        public string Name { get; set; }
        public int SegmentId { get; set; }
        public SegmentDto Segment { get; set; }
        public List<ModelDto> Models { get; set; }
        public List<ProductDto> Products { get; set; }

    }
}