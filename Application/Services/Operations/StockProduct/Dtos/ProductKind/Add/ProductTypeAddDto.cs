
using Application.Services.Shared.Dtos;

namespace Application.Services.Operations.StockProduct.ProductKind.Add
{

    public class ProductTypeAddDto: RootBaseDto
    {
        public string Name { get; set; }
        public SegmentAddDto Segment { get; set; }
        
        
    }
}