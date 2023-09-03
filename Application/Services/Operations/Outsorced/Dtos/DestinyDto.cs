using System;
using Application.Services.Operations.Main.Customers.Dtos;
using Application.Services.Operations.Main.Partners.Dtos;
using Domain.Entities;

namespace Application.Services.Operations.Outsourced.Dtos
{
    public class DestinyDto
    {
        public int Id { get; set; }
        public int? CustomerId { get; set; }
        public CustomerDto Customer { get; set; }
        public int? PartnerId { get; set; }
        public PartnerDto Partner { get; set; }
        public string NoRegisterName { get; set; }
        public string NoRegisterAddress { get; set; }
        public string Description { get; set; }
        public int CollectDeliverId { get; set; }
        public CollectDeliverDto CollectDeliver { get; set; }

    }
}
