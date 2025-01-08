using System.Collections.Generic;
using Domain.Entities.Shared;

namespace Domain.Entities.StockProduct.ProductKind
{
    public class Model : RootBase
    {
        public string Name { get; set; }
        public int ManufacturerId { get; set; }
        public Manufacturer Manufacturer { get; set; }
        public Specificities Specificities { get; set; }
        // public List<Specificities> Specificities { get; set; }
        public List<Product> Products { get; set; }

    }
}