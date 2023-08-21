using System;
using Domain.Entities.Authentication;
using Domain.Entities.Main;
using Domain.Entities.Main.Companies;
using Domain.Entities.Main.Customers;
using Domain.Entities.Outsourced.Enums;

namespace Domain.Entities.Outsourced
{
    public class ElectronicRepair
    {
        public int Id { get; set; }
        public int CompanyId { get; set; }
        public Company Company { get; set; }
        public int UserId { get; set; }
        public MyUser User { get; set; }
        public string Item { get; set; }
        public DateTime EntryDate { get; set; }
        public string Description { get; set; }
        public string Problem { get; set; }
        public string UserEquipament { get; set; }
        public string PasswordEquipament { get; set; }
        public Decimal Price { get; set; }
        public int ServiceProviderId { get; set; }
        public Partner ServiceProvider { get; set; }
        public int CustomerId { get; set; }
        public Customer Customer { get; set; }
        public string SolutionApplied { get; set; }
        public StatusServiceEletronicReparEnum Status { get; set; }

    }
}
