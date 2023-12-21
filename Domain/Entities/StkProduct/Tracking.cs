using System;
using System.Collections.Generic;
using Domain.Entities.Authentication;
using Domain.Entities.Main;
using Domain.Entities.Main.Customers;

namespace Domain.Entities.StkProduct
{
    public class Tracking
    {
        public int Id { get; set; }
        public decimal CostPrice { get; set; }
        public decimal SoldPrice { get; set; }
        public string Sn { get; set; }
        public string NfNumber { get; set; }
        public bool IncludedService { get; set; }
        public int ProductId { get; set; }
        public Product Product { get; set; }
        public int? CustomerId { get; set; }
        public Customer Customer { get; set; }
        public int UserId { get; set; }
        public MyUser User { get; set; }

    }
}