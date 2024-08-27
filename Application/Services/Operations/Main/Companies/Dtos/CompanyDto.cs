using System.Collections.Generic;
using Application.Services.Operations.Authentication.Dtos;
using Application.Services.Operations.BenchBudgetService.Dtos;
using Application.Services.Operations.Finances.Dtos.Bank;
using Application.Services.Operations.Finances.Dtos.MonthlyExpenses;
using Application.Services.Operations.Main.Customers.Dtos;
using Application.Services.Operations.Main.Partners.Dtos;
using Application.Services.Operations.Outsourced.Dtos;
using Application.Services.Shared.Dtos.Address;
using Application.Services.Shared.Dtos.Contact;

namespace Application.Services.Operations.Main.Companies.Dtos
{
    public class CompanyDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public AddressDto Address { get; set; }
        public ContactDto Contact { get; set; }
        public List<MyUserDto> MyUsers { get; set; }
        public List<CustomerDto> Customers { get; set; }
        public List<PartnerDto> Partners { get; set; }
        public List<CollectDeliverDto> CollectsDelivers { get; set; }
        public List<BudgetServiceDto> ServicesExecuted { get; set; }
        public List<ElectronicRepairDto> ElectronicsRepairs { get; set; }
        public List<BankAccountDto> BankAccounts { get; set; }
         public List<MonthlyFixedExpenseDto> Expenses { get; set; }
    }


}
