using Domain.Entities.Shared;
using System.Collections.Generic;
using Domain.Entities.Main.Companies;

namespace Application.Services.Operations.StockProduct.ProductKind.Add
{

    public class ProductTypeDto: RootBase
    {
        public string Name { get; set; }
        public SegmentDto Segment { get; set; }
        
        
    }
}