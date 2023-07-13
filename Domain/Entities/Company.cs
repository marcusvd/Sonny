using System.Collections.Generic;
using Domain.Entities.Authentication;
using Domain.Entities.Financial;
using Domain.Entities.Outsourced;
using Domain.Entities.Shared;
using Domain.Entities.Stocks;

namespace Domain.Entities
{
    public class Company
    {
        public Company(string name)
        {
            Name = name;
        }

        public int Id { get; set; }
        public string Name { get; set; }
        public Stock Stock { get; set; }
        public Address Address { get; set; }
        public Contact Contact { get; set; }
        public List<MyUser> MyUsers { get; set; }
        public List<CollectDeliver> CollectsDelivers { get; set; }
        public List<Customer> Customers { get; set; }
        public List<Partner> Partners { get; set; }
        public List<Card> Cards { get; set; }
        public List<ElectronicRepair> ElectronicsRepairs { get; set; }
        public List<EssentialExpense> EssentialsExpenses { get; set; }
        public List<FinancingLoan> FinancingsLoans { get; set; }
        public List<TypePayment> TypesPayments { get; set; }
    }


}
