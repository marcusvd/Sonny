using System;
using System.ComponentModel.DataAnnotations.Schema;
using Application.Services.Operations.Main.Customers.Dtos;
using Application.Services.Operations.Main.Partners.Dtos;
using Domain.Entities;

namespace Application.Services.Operations.Outsourced.Dtos
{
    public class BillingFromDto
    {
        public int Id { get; set; }

        public int? PartnerId { get; set; }
        public PartnerDto Partner { get; set; }

        public int? CustomerId { get; set; }
        public CustomerDto Customer { get; set; }

        public bool Base { get; set; }
    }
}
