using Domain.Entities.StockProduct.ProductKind;
using Domain.Entities.Shared;


namespace Domain.Entities.StockProduct
{
    public class Product: RootBase
    {
        public string Name { get; set; }
        public Manufacturer Manufacturer { get; set; }
        public Segment Segment { get; set; }
        public Model Model { get; set; }
        public string Description { get; set; }
    }
}