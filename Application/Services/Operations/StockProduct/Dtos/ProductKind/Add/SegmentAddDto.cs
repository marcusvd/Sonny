using Application.Services.Shared.Dtos;

namespace Application.Services.Operations.StockProduct.ProductKind.Add
{
    public class SegmentAddDto : RootBaseDto
    {
        public string Name { get; set; }
        public ManufacturerAddDto Manufacturer { get; set; }
    }
}