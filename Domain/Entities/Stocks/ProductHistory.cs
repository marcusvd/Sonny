using System;

namespace Domain.Entities.Stocks
{
    public class ProductHistory
    {
        public int Id { get; set; }
        public int ProductId { get; set; }
        public Product Product { get; set; }
        public string Sn { get; set; }
        public string NfNumber { get; set; }
        public string Manufacturer { get; set; }
        public string Model { get; set; }
        public StatusEnum Status { get; set; }
        public int Quantity { get; set; }
        public int QuantityReserved { get; set; }
        public DateTime EntryDate { get; set; }
        public DateTime SoldDate { get; set; }
        public DateTime Warranty { get; set; }
        public decimal CostPrice { get; set; }
        public decimal SalePrice { get; set; }
    }
}