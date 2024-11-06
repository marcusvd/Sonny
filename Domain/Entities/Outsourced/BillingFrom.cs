using System;
using System.ComponentModel.DataAnnotations.Schema;
using Domain.Entities.Main;
using Domain.Entities.Main.Customers;
using Domain.Entities.Shared;

namespace Domain.Entities.Outsourced
{
    public class BillingFrom:RootBase
    {
        public int? PartnerId { get; set; }
        public Partner Partner { get; set; }

        public int? CustomerId { get; set; }
        public Customer Customer { get; set; }
        
        public bool Base { get; set; }
    }
}
