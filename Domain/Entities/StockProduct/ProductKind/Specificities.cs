using System.Collections.Generic;
using Domain.Entities.Shared;

namespace Domain.Entities.StockProduct.ProductKind
{
    public class Specificities : RootBase
    {
        public string Capacity { get; set; }
        public string Speed { get; set; }
        public int ModelId { get; set; }
        public Model Model { get; set; }
        public List<Product> Products { get; set; }

    }
}