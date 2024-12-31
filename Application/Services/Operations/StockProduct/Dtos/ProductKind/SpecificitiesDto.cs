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
        public string Version { get; set; }
        public int ModelId { get; set; }
        public ModelDto Model { get; set; }
        public List<ProductDto> Products { get; set; }

    }
}