using System.Collections.Generic;
using Domain.Entities.Shared;

namespace Domain.Entities.StockProduct.ProductKind
{
    public class Specificities : RootBase
    {
        public string Capacity { get; set; }
        public string Speed { get; set; }
        public string Generation { get; set; }
        public string DetailedDescription { get; set; }
        public string Description { get; set; }
        public string ManufacturerLink { get; set; }
        public List<Product> Products { get; set; }
    }
}