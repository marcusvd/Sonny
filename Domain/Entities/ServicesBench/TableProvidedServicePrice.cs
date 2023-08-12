using System;
using System.Collections.Generic;
using Domain.Entities;

namespace Domain.Entities.ServicesBench
{
    public class TableProvidedServicePrice
    {
        public int Id { get; set; }
        public string ServiceName { get; set; }
        public Decimal PriceService { get; set; }
    }
}
