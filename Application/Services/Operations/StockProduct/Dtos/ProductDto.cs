using System;

using Application.Services.Shared.Dtos;
using Application.Services.Operations.Main.Partners.Dtos;
using Application.Services.Operations.Authentication.Dtos;
using Application.Services.Operations.Main.Customers.Dtos;
using Application.Services.Operations.StockProduct.ProductKind;

namespace Application.Services.Operations.StockProduct
{
    public class ProductDto : RootBaseDto
    {
        public int ProductTypeId { get; set; }
        public ProductTypeDto ProductType { get; set; }
        public int SegmentId { get; set; }
        public SegmentDto Segment { get; set; }
        public int ManufacturerId { get; set; }
        public ManufacturerDto Manufacturer { get; set; }
        public int ModelId { get; set; }
        public ModelDto Model { get; set; }
        public int SpecificitiesId { get; set; }
        public SpecificitiesDto Specificities { get; set; }
        public int? IsReservedByUserId { get; set; } = null;
        public MyUserDto IsReservedByUser { get; set; }
        public DateTime IsReserved { get; set; }
        public int? ReservedForCustomerId { get; set; } = null;
        public CustomerDto ReservedForCustomer { get; set; }
        public int SupplierId { get; set; }
        public PartnerDto Supplier { get; set; }
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
        public int Quantity { get; set; }
        public string Description { get; set; }
    }
}