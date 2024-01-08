using System.Collections.Generic;
using Domain.Entities.Authentication;
using Domain.Entities.Outsourced;
using Domain.Entities.StkProduct;
using Domain.Entities.ServicesBench;
using Domain.Entities.Main.Customers;
using Domain.Entities.Main.Inheritances;
using Domain.Entities.Shared;
using Domain.Entities.Finances;
using Domain.Entities.Fill.StkProduct;

namespace Domain.Entities.Main.Companies
{
    public class Company
    {
        public Company()
        { }
        public Company(string name)
        {
            Name = name;
        }
         public Company(int id, string name)
        {
            Name = name;
            Id = id;
        }
        public int Id{ get; set; }
        public string Name { get; set; }
        public Address Address { get; set; }
        public Contact Contact { get; set; }
        public List<MyUser> MyUsers { get; set; }
        public List<Customer> Customers { get; set; }
        public List<Partner> Partners { get; set; }
        public List<Product> Products { get; set; }
        public List<Equipament_Fill> Equipament_Fillers { get; set; }
        public List<Manufacturer_Fill> Manufacturer_Fillers { get; set; }
        public List<Segment_Fill> Segment_Fillers { get; set; }
        public List<CollectDeliver> CollectsDelivers { get; set; }
        public List<BudgetService> ServicesExecuted { get; set; }
        public List<ElectronicRepair> ElectronicsRepairs { get; set; }
        public List<FinancialBankAccount> BankAccounts { get; set; }
        public List<FinancialExpenses> Expenses { get; set; }
        public List<TableProvidedServicePrice> TableProvidedServicesPrices { get; set; }
    }


}
