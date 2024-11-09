using System;
using Domain.Entities.Main;
using Domain.Entities.Shared;

namespace Domain.Entities.Outsourced
{
    public class CollectDeliver : RootBase
    {
        public int? TransporterId { get; set; }
        public Partner Transporter { get; set; }
        // public string SubjectReason { get; set; }
        public string ContactName { get; set; }
        public DateTime Start { get; set; }
        public decimal Price { get; set; }
        public DateTime WasPaid { get; set; }
        public DateTime Collect { get; set; }
        public DateTime Deliver { get; set; }
        public DateTime Other { get; set; }
        public string KindTransport { get; set; }
        public BillingFrom BillingFrom { get; set; }
        public string TaskOverView { get; set; }
        public Destiny Destiny { get; set; }
        
    }
}
