using Domain.Entities.Shared;

namespace Application.Services.Operations.StockProduct.ProductKind
{
    public class ModelDto: RootBase
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public int ManufacturerId { get; set; }
        public ManufacturerDto Manufacturer { get; set; }

    }
}