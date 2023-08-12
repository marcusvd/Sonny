using System;
using System.Collections.Generic;
using Application.Services.Operations.Authentication.Dtos;
using Application.Services.Operations.Main.Companies.Dtos;
using Application.Services.Operations.Main.Partners.Dtos;

namespace Application.Services.Operations.Outsourced.Dtos
{
    public class CollectDeliverDto
    {
        public int Id { get; set; }
        public int CompanyId { get; set; }
        public CompanyDto Company { get; set; }
        public int UserId { get; set; }
        public MyUserDto User { get; set; }
        public int TransporterId { get; set; }
        public PartnerDto Transporter { get; set; }
        public string SubjectReason { get; set; }
        public string ContactName { get; set; }
        public DateTime Start { get; set; }
        public BillingFromDto BillingFrom { get; set; }
        public string TaskOverView { get; set; }
        public List<DestinyDto> Destinies { get; set; }
    }
}