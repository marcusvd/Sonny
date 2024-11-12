using System.Collections.Generic;
using Domain.Entities.Shared;


namespace Domain.Entities.StockProduct
{
    public class Stock: RootBase
    {
        public Product Product { get; set; }
        public List<ItemProduct> ItemsProducts { get; set; }
       // public List<Sold> Solds { get; set; }
    }
}