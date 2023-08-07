using System;
using System.Collections.Generic;
using Domain.Entities;

namespace Domain.Entities.ServicesBench
{
    public class ServicesPrices
    {
        public int ServiceId { get; set; }
        public Service Service {get; set;}
        public int PriceId { get; set; }
        public Price Price {get; set;}

    }
}
