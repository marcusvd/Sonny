using System;
using Domain.Entities.Shared;

using Domain.Entities.Main;
using Domain.Entities.Authentication;
using Domain.Entities.Main.Customers;
using Domain.Entities.StockProduct.ProductKind;

namespace Domain.Entities.StockProduct
{
    public class Product : RootBase
    {
        public int ProductTypeId { get; set; }
        public ProductType ProductType { get; set; }
        public int SegmentId { get; set; }
        public Segment Segment { get; set; }
        public int ManufacturerId { get; set; }
        public Manufacturer Manufacturer { get; set; }
        public int ModelId { get; set; }
        public Model Model { get; set; }
        public int SpecificitiesId { get; set; }
        public Specificities Specificities { get; set; }
        public int? IsReservedByUserId { get; set; } = null;
        public MyUser IsReservedByUser { get; set; }
        public DateTime IsReserved { get; set; }
        public int? ReservedForCustomerId { get; set; } = null;
        public Customer ReservedForCustomer { get; set; }
        public int? SupplierId { get; set; }
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
        public string Description { get; set; }

    }

}