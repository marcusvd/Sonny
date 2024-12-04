using System.Collections.Generic;
using Domain.Entities.Shared;

namespace Domain.Entities.StockProduct.ProductKind
{
    public class Model: RootBase
    {
        public string Name { get; set; }
        public string Capacity { get; set; }
        public string Speed { get; set; }
        public string Description { get; set; }
        public int ManufacturerId { get; set; }
        public Manufacturer Manufacturer { get; set; }
        public List<Product> Products { get; set; }

    }
}