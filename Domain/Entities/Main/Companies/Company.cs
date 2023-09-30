using System.Collections.Generic;
using Domain.Entities.Authentication;
using Domain.Entities.Outsourced;
using Domain.Entities.Product;
using Domain.Entities.ServicesBench;
using Domain.Entities.Main.Customers;
using Domain.Entities.Main.Inheritances;
using Domain.Entities.Shared;
using Domain.Entities.Finances;

namespace Domain.Entities.Main.Companies
{
    public class Company
    {
        public Company(string name)
        {
            Name = name;
        }
        public int Id{ get; set; }
        public string Name { get; set; }
        public Stock Stock { get; set; }
        public Address Address { get; set; }
        public Contact Contact { get; set; }
        public List<MyUser> MyUsers { get; set; }
        public List<Customer> Customers { get; set; }
        public List<Partner> Partners { get; set; }
        public List<CollectDeliver> CollectsDelivers { get; set; }
        public List<BudgetService> ServicesExecuted { get; set; }
        public List<ElectronicRepair> ElectronicsRepairs { get; set; }
        public List<FinancialBankAccount> BankAccounts { get; set; }
        public List<FinancialBillToPayList> BillToPayLists { get; set; }
        public List<Manufacturer> Manufacturers { get; set; }
        public List<EquipamentType> EquipamentTypies { get; set; }
        public List<TableProvidedServicePrice> TableProvidedServicesPrices { get; set; }
    }


}
