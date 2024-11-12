using System.Collections.Generic;
using Domain.Entities.Shared;


namespace Application.Services.Operations.StockProduct.ProductKind
{
    public class ManufacturerDto: RootBase
    {
        public string Name { get; set; }
        public int SegmentId { get; set; }
        public SegmentDto Segment { get; set; }
        public List<ModelDto> Models { get; set; }

    }
}