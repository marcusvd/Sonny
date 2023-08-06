using System.Collections.Generic;
using Application.Dto.Authentication;
using Application.Dto.Financial;
using Application.Dto.Outsourced;
using Application.Dto.Shared;
using Application.Services.Operations.Outsourced.Dtos;
using Application.Services.Operations.Products.Dtos;

namespace Application.Dto
{
    public class CompanyDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public StockDto Stock { get; set; }
        public AddressDto Address { get; set; }
        public ContactDto Contact { get; set; }
        public List<MyUserDto> MyUsers { get; set; }
        public List<CollectDeliverDto> CollectsDelivers { get; set; }
        public List<CustomerDto> Customers { get; set; }
        public List<PartnerDto> Partners { get; set; }
        public List<CardDto> Cards { get; set; }
        public List<ElectronicRepairDto> ElectronicsRepairs { get; set; }
        public List<EssentialExpenseDto> EssentialsExpenses { get; set; }
        public List<FinancingLoanDto> FinancingsLoans { get; set; }
        public List<TypePaymentDto> TypesPayments { get; set; }
    }


}
