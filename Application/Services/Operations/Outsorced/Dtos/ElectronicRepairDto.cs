using System;
using Application.Services.Operations.Authentication.Dtos;
using Application.Services.Operations.Main.Companies.Dtos;
using Application.Services.Operations.Main.Customers.Dtos;
using Application.Services.Operations.Main.Partners.Dtos;
using Domain.Entities.Authentication;
using Domain.Entities.Main;
using Domain.Entities.Main.Companies;
using Domain.Entities.Main.Customers;
using Domain.Entities.Outsourced.Enums;

namespace Application.Services.Operations.Outsourced.Dtos
{
    public class ElectronicRepairDto
    {
        public int Id { get; set; }
        public int CompanyId { get; set; }
        public CompanyDto Company { get; set; }
        public int UserId { get; set; }
        public MyUserDto User { get; set; }
        public string Item { get; set; }
        public DateTime EntryDate { get; set; }
        public string Description { get; set; }
        public string Problem { get; set; }
        public string UserEquipament { get; set; }
        public string PasswordEquipament { get; set; }
        public Decimal Price { get; set; }
        public int ServiceProviderId { get; set; }
        public PartnerDto ServiceProvider { get; set; }
        public int CustomerId { get; set; }
        public CustomerDto Customer { get; set; }
        public string SolutionApplied { get; set; }
        public StatusServiceEletronicReparEnum Status { get; set; }

    }
}
