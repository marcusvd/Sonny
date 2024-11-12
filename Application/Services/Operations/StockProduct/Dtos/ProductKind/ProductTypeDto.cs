using Domain.Entities.Shared;
using System.Collections.Generic;
using Domain.Entities.Main.Companies;

namespace Application.Services.Operations.StockProduct.ProductKind
{

    public class ProductTypeDto: RootBase
    {
        public string Name { get; set; }
        public List<SegmentDto> Segments { get; set; }
        
        
    }
}