using System.Collections.Generic;
using Application.Services.Shared.Dtos;

namespace Application.Services.Operations.StockProduct.ProductKind
{
    public class SegmentDto : RootBaseDto
    {
        public string Name { get; set; }
        public int ProductTypeId { get; set; }
        public ProductTypeDto ProductType { get; set; }
        public List<ManufacturerDto> Manufacturers { get; set; }


    }
}