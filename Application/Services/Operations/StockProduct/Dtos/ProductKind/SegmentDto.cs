using System.Collections.Generic;
using Domain.Entities.Shared;


namespace Application.Services.Operations.StockProduct.ProductKind
{
    public class SegmentDto : RootBase
    {
        public string Name { get; set; }
        public int ProductTypeId { get; set; }
        public ProductTypeDto ProductType { get; set; }
        public List<ManufacturerDto> Manufacturers { get; set; }


    }
}