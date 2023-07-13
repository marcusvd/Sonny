using System;
using System.Collections.Generic;

namespace Domain.Entities.Stocks
{
    public class Stock
    {
        public int StockId { get; set; }
        // public int CompanyId { get; set; }
        // public Company Company { get; set; }
        public List<Product> Products { get; set; }
        
    }
}