

using System.Collections.Generic;
using Application.Services.Shared.Dtos;

namespace Application.Services.Operations.StockProduct.ProductKind
{
    public class ModelDto : RootBaseDto
    {
        public string Name { get; set; }
        public int ManufacturerId { get; set; }
        public ManufacturerDto Manufacturer { get; set; }
        // public List<SpecificitiesDto> Specificities { get; set; }
        public SpecificitiesDto Specificities { get; set; }
        public List<ProductDto> Products { get; set; }

    }
}