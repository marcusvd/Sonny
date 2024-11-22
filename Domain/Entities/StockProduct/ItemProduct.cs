using System;
using Domain.Entities.Shared;

using Domain.Entities.Main;
using Domain.Entities.Authentication;
using Domain.Entities.Main.Customers;

namespace Domain.Entities.StockProduct
{
    public class ItemProduct : RootBase
    {
        public int StockId { get; set; }
        public Stock Stock { get; set; }
        public int? IsReservedByUserId { get; set; } = null;
        public MyUser IsReservedByUser { get; set; }
        public DateTime IsReserved { get; set; }
        public int? ReservedForCustomerId { get; set; } = null;
        public Customer ReservedForCustomer { get; set; }
        public int SupplierId { get; set; }
        public Partner Supplier { get; set; }
        public string UsedHistoricalOrSupplier { get; set; }
        public string PurchaseInvoiceNumber { get; set; } // Número de Nfe de entrada
        public decimal CostPrice { get; set; }
        public decimal SoldPrice { get; set; }
        public DateTime EntryDate { get; set; }
        public DateTime SoldDate { get; set; }
        public DateTime WarrantyEnd { get; set; }
        public DateTime WarrantyEndLocal { get; set; }
        public bool IsUsed { get; set; } = false;
        public DateTime IsTested { get; set; } = DateTime.MinValue;
        

    }
}