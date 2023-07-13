using System;
using System.Collections.Generic;

namespace Domain.Entities.Stocks
{
    public class Product
    {
        public int Id { get; set; }
        public int StockId {get; set;}
        public Stock Stock {get; set;}
        public List<ProductHistory> ProductsHistories {get; set;}
        public string EquipamentType { get; set; }
        public string NormalizedName { get; set; }
        public bool IsNew { get; set; }
        public bool IsTested { get; set; }
        public int SupplierId { get; set; }
        public Partner Supplier { get; set; }
        public string Description { get; set; }
        public string UsedHistorical { get; set; }

    }
}