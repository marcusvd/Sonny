using System;
using System.ComponentModel.DataAnnotations.Schema;
using Application.Dto;
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
        public Decimal AmountPrice { get; set; }
    }
}
