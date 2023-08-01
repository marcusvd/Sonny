using System;
using System.Collections.Generic;

namespace Domain.Entities.Stocks
{
    public class Stock
    {
        public Stock(int id)
        {
            Id = id;
        }
        public int Id { get; set; }
        public List<Product> Products { get; set; }
    }
}