using System;
using System.Collections.Generic;
using Domain.Entities;

namespace Domain.Entities.ServicesBench
{
    public class Service
    {
        public int Id { get; set; }
        // public int ServicesPricesId {get; set;}
        // public ServicesPrices ServicesPrices {get; set;}
        public string ExecutedServicesComments { get; set; }
        public DateTime Start { get; set; }
        public DateTime Finished { get; set; }
        public Decimal AmountPrice { get; set; }
        public DateTime WasCollected { get; set; }
        public Decimal CollectPrice { get; set; }
        public DateTime WasDelivered { get; set; }
        public Decimal DeliveredtPrice { get; set; }
    }
}
