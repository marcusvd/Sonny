using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using Domain.Entities.Authentication;
using Domain.Entities.Main;
using Domain.Entities.Main.Companies;

namespace Domain.Entities.Outsourced
{
    public class CollectDeliver
    {
        public int Id { get; set; }
        public int CompanyId { get; set; }
        public Company Company { get; set; }
        public int UserId { get; set; }
        public MyUser User { get; set; }
        public int? TransporterId { get; set; }
        public Partner Transporter { get; set; }
        public string SubjectReason { get; set; }
        public string ContactName { get; set; }
        public DateTime Start { get; set; }
        public Decimal Price { get; set; }
        public bool Collect { get; set; }
        public bool Deliver { get; set; }
        public bool Other { get; set; }
        public BillingFrom BillingFrom { get; set; }
        public string TaskOverView { get; set; }
        public Destiny Destiny { get; set; }
    }
}
