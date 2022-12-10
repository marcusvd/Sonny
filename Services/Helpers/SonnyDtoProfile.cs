using AutoMapper;
using Services.Dto;
using Services.Dto.CollectsDelivers;
using Domain.Entities;
using Pagination;
using Services.Dto.ServiceBudgetBench;
using Domain.Entities.BudgetBench;
using Domain.Entities.Financial;
using Services.Dto.Financial;
using Domain.Entities.Shared;
using Domain.Entities.Outsourced;
using Services.Dto.Outsourced;
using Services.Dto.Shared;

namespace Services.Helpers
{
    public class SonnyDtoProfile : Profile
    {
        public SonnyDtoProfile()
        {
            #region BudgetBench
            CreateMap<ServiceBudget, ServiceBudgetDto>().ReverseMap();
            CreateMap<SolutionPrice, SolutionPriceDto>().ReverseMap();
            CreateMap<ServiceBench, ServiceBenchDto>().ReverseMap();
            CreateMap<BenchToCashBox, BenchToCashBoxDto>().ReverseMap();
            #endregion
            #region Financial
            CreateMap<Card, CardDto>().ReverseMap();
            CreateMap<CheckingAccount, CheckingAccountDto>().ReverseMap();
            CreateMap<TypePayment, TypePaymentDto>().ReverseMap();
            CreateMap<EssentialExpense, EssentialExpenseDto>().ReverseMap();
            CreateMap<EssentialExpenseValue, EssentialExpenseValueDto>().ReverseMap();
            CreateMap<FinancingLoan, FinancingLoanDto>().ReverseMap();
            #endregion
            #region Shared
            CreateMap<Address, AddressDto>().ReverseMap();
            CreateMap<Contact, ContactDto>().ReverseMap();
            CreateMap<SocialNetwork, SocialNetworkDto>().ReverseMap();
            #endregion
            #region OutSourced
            CreateMap<CollectDeliver, CollectDeliverDto>().ReverseMap();
            CreateMap<EletronicRepair, EletronicRepairDto>().ReverseMap();
            #endregion
            #region Company
            CreateMap<Company, CompanyDto>().ReverseMap();
            #endregion
            #region Customer
            CreateMap<Customer, CustomerDto>().ReverseMap();
            #endregion
            #region Inventory
            CreateMap<Inventory, InventoryDto>().ReverseMap();
            #endregion
            #region Partner
            CreateMap<Partner, PartnerDto>().ReverseMap();
            #endregion
        }
    }
}


