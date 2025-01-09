using System.Collections.Generic;
using Domain.Entities.Shared;

namespace Application.Services.Operations.StockProduct.ProductKind
{
    public class SpecificitiesDto : RootBase
    {
        public string Name { get; set; }
        public string Capacity { get; set; }
        public string Speed { get; set; }
        public string Generation { get; set; }
        public string DetailedDescription { get; set; }
        public string Description { get; set; }
        public string ManufacturerLink { get; set; }
        public List<ProductDto> Products { get; set; }

    }
}