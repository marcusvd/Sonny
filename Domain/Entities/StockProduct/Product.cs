using Domain.Entities.StockProduct.ProductKind;
using Domain.Entities.Shared;


namespace Domain.Entities.StockProduct
{
    public class Product: RootBase
    {
        public ProductType ProductType { get; set; }
        // public int ManufacturerId { get; set; }
        public Manufacturer Manufacturer { get; set; }
        // public int SegmentId { get; set; }
        public Segment Segment { get; set; }
        // public int ModelId { get; set; }
        public Model Model { get; set; }
        public string Description { get; set; }
    }
}