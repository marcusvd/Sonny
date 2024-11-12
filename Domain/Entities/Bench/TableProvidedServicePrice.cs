using System;
using System.Collections.Generic;
using Domain.Entities;
using Domain.Entities.Main.Companies;

namespace Domain.Entities.ServicesBench
{
    public class TableProvidedServicePrice
    {
        public int Id { get; set; }
        public string ServiceName { get; set; }
        public Decimal PriceService { get; set; }
        public int CompanyId { get; set; }
        public Company Company { get; set; }
    }
}
