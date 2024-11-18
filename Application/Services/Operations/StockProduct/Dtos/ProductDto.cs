

using Application.Services.Operations.StockProduct.ProductKind;
using Application.Services.Shared.Dtos;

namespace Application.Services.Operations.StockProduct
{
    public class ProductDto: RootBaseDto
    {
        public string Name { get; set; }
        public int ManufacturerId { get; set; }
        public ManufacturerDto Manufacturer { get; set; }
        public int SegmentId { get; set; }
        public SegmentDto Segment { get; set; }
        public int ModelId { get; set; }
        public ModelDto Model { get; set; }
        public string Description { get; set; }
    }
}