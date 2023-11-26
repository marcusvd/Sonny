using System;
using Domain.Entities.Authentication;
using Domain.Entities.Main;
using Domain.Entities.Main.Customers;

namespace Domain.Entities.StkProduct
{
    public class Quantity
    {
        public int Id { get; set; }
        public string Sn { get; set; }
        public string NfNumber { get; set; }
        public decimal CostPrice { get; set; }
        public decimal SoldPrice { get; set; }
        public DateTime EntryDate { get; set; }
        public DateTime SoldDate { get; set; }
        public DateTime WarrantyEnd { get; set; }
        public DateTime WarrantyEndLocal { get; set; }
        public bool IsUsed { get; set; } = false;
        public bool IsTested { get; set; }
        public DateTime IsReserved { get; set; }
        public string UsedHistorical { get; set; }
        public int? CustomerId { get; set; }
        public Customer Customer { get; set; }
        public int ProductId { get; set; }
        public Product Product { get; set; }
        public int SupplierId { get; set; }
        public Partner Supplier { get; set; }
        public int? ReservedOrSoldByUserId { get; set; }
        public MyUser ReservedOrSoldByUser { get; set; }


    }
}