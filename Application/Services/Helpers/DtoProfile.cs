using AutoMapper;
using Application.Dto;
using Application.Dto.Outsourced;
using Domain.Entities;
using Application.Dto.ServiceBudgetBench;
using Domain.Entities.BudgetBench;
using Domain.Entities.Financial;
using Application.Dto.Financial;
using Domain.Entities.Shared;
using Domain.Entities.Outsourced;
using Application.Dto.Shared;
using Domain.Entities.Authentication;
using Application.Dto.Authentication;
using Domain.Entities.Stocks;
using Application.Services.Operations.Products.Dtos;

namespace Application.Services.Helpers
{
    public class DtoProfile : Profile
    {
        public DtoProfile()
        {
            #region Authentication
            CreateMap<MyUser, MyUserDto>().ReverseMap();
            #endregion
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
            CreateMap<ChargeForm, ChargeFormDto>().ReverseMap();
            CreateMap<ElectronicRepair, ElectronicRepairDto>().ReverseMap();
            #endregion
            #region Company
            CreateMap<Company, CompanyDto>().ReverseMap();
            #endregion
            #region Customer
            CreateMap<Customer, CustomerDto>().ReverseMap();
            #endregion
            #region Product
            CreateMap<EquipamentType, EquipamentTypeDto>().ReverseMap();
            CreateMap<Manufacturer, ManufacturerDto>().ReverseMap();
            CreateMap<Product, ProductDto>().ReverseMap();
            CreateMap<Quantity, QuantityDto>().ReverseMap();
            CreateMap<StatusEnum, StatusEnumDto>().ReverseMap();
            CreateMap<Stock, StockDto>().ReverseMap();
            CreateMap<Tracking, TrackingDto>().ReverseMap();
            #endregion
            #region Partner
            CreateMap<Partner, PartnerDto>().ReverseMap();
            #endregion
        }
    }
}


