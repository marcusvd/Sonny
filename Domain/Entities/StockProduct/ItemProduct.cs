using System;
using Domain.Entities.Shared;

using Domain.Entities.Main;

namespace Domain.Entities.StockProduct
{
    public class ItemProduct: RootBase
    {   public string NfNumber { get; set; }
        public decimal CostPrice { get; set; }
        public decimal SoldPrice { get; set; }
        public DateTime EntryDate { get; set; }
        public DateTime SoldDate { get; set; }
        public DateTime WarrantyEnd { get; set; }
        public DateTime WarrantyEndLocal { get; set; }
        public bool IsUsed { get; set; } = false;
        public DateTime IsTested { get; set; } = DateTime.MinValue;
        public string UsedHistorical { get; set; }
        public int StockId { get; set; }
        public Stock Stock { get; set; }
        public int SupplierId { get; set; }
        public Partner Supplier { get; set; }
    }
}