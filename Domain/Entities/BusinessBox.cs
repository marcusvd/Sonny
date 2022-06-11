using System;

namespace Domain.Entities
{
    public class BusinessBox
    {
        public int Id { get; set; }
        public decimal SoldAmount { get; set; }
        public decimal Amount { get; set; }
        public int? InventoryId { get; set; }
        public Inventory Inventory { get; set; }
        public int? ClientId { get; set; }
        public ClientEntity Client { get; set; }
        public DateTime Today { get; set; }

    }
}