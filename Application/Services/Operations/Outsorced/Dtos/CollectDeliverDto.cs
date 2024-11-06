using System;
using System.Collections.Generic;
using Application.Services.Operations.Authentication.Dtos;
using Application.Services.Operations.Main.Companies.Dtos;
using Application.Services.Operations.Main.Partners.Dtos;
using Application.Services.Shared.Dtos;

namespace Application.Services.Operations.Outsourced.Dtos
{
    public class CollectDeliverDto : RootBaseDto
    {
        public int? TransporterId { get; set; }
        public PartnerDto Transporter { get; set; }
        public string SubjectReason { get; set; }
        public string ContactName { get; set; }
        public DateTime Start { get; set; }
        public decimal Price { get; set; }
        public DateTime WasPaid { get; set; }
        public DateTime Collect { get; set; }
        public DateTime Deliver { get; set; }
        public DateTime Other { get; set; }
        public string KindTransport { get; set; }
        public BillingFromDto BillingFrom { get; set; }
        public string TaskOverView { get; set; }
        public DestinyDto Destiny { get; set; }
    }
}