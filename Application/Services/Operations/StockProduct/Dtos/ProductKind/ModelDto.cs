

using System.Collections.Generic;
using Application.Services.Shared.Dtos;

namespace Application.Services.Operations.StockProduct.ProductKind
{
    public class ModelDto : RootBaseDto
    {
        public string Name { get; set; }
        public string Capacity { get; set; }
        public string Speed { get; set; }
        public string Description { get; set; }
        public int ManufacturerId { get; set; }
        public ManufacturerDto Manufacturer { get; set; }
         public List<ProductDto> Products { get; set; }

    }
}