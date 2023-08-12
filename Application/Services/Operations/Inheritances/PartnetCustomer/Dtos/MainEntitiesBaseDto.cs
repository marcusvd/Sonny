using System;
using System.Collections.Generic;
using Application.Services.Operations.Main.Companies.Dtos;
using Application.Services.Operations.Outsourced.Dtos;
using Application.Services.Operations.Products.Dtos;
using Application.Services.Shared.Dtos.Address;
using Application.Services.Shared.Dtos.Contact;

namespace Application.Services.Operations.Inheritances.PartnetCustomer.Dtos
{
    public class MainEntitiesBaseDto
    {
        public int Id { get; set; }
        public int CompanyId { get; set; }
        public  CompanyDto Company { get; set; }
        public string Name { get; set; }
        public string Responsible { get; set; }
        public string CNPJ { get; set; }
        public string NormalizedName { get; set; }
        public DateTime Registered { get; set; }
        public string Description { get; set; }
        public AddressDto Address { get; set; }
        public ContactDto Contact { get; set; }
        public PhysicallyMovingCostsDto PhysicallyMovingCosts { get; set; }
        public List<DestinyDto> CollectDeliverDestinies { get; set; }
        public List<BillingFromDto> BillingFromCollectsDelivers { get; set; }
        public List<QuantityDto> ProductsQuantities { get; set; }
    }


}
