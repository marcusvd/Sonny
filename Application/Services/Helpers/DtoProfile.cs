using AutoMapper;
using Domain.Entities.Shared;
using Domain.Entities.Outsourced;
using Domain.Entities.Authentication;
using Domain.Entities.Stocks;
using Application.Services.Operations.Products.Dtos;
using Application.Services.Operations.Outsourced.Dtos;
using Domain.Entities.ServicesBench;
using Application.Services.Operations.BenchBudgetService.Dtos;
using Domain.Entities.Main;
using Domain.Entities.Main.Companies;
using Domain.Entities.Main.Customers;
using Application.Services.Operations.Main.Customers.Dtos;
using Application.Services.Operations.Inheritances.PartnetCustomer.Dtos;
using Domain.Entities.Main.Inheritances;
using Application.Services.Operations.Main.Partners.Dtos;
using Application.Services.Operations.Main.Companies.Dtos;
using Application.Services.Operations.Authentication.Dtos;
using Application.Services.Shared.Dtos.Address;
using Application.Services.Shared.Dtos.Contact;
using Domain.Entities.Finances;
using Application.Services.Operations.Finances.Dtos;

namespace Application.Services.Helpers
{
    public class DtoProfile : Profile
    {
        public DtoProfile()
        {
            #region Inheritances
            CreateMap<MainEntitiesBase, MainEntitiesBaseDto>().ReverseMap();
            CreateMap<PhysicallyMovingCosts, PhysicallyMovingCostsDto>().ReverseMap();
            #endregion
            #region Authentication
            CreateMap<MyUser, MyUserDto>().ReverseMap();
            #endregion
            #region BudgetBench
            CreateMap<BudgetService, BudgetServiceDto>().ReverseMap();
            CreateMap<Service, ServiceDto>().ReverseMap();
            CreateMap<Price, PriceDto>().ReverseMap();
            CreateMap<CollectDeliverCosts, CollectDeliverCostsDto>().ReverseMap();
            CreateMap<TableProvidedServicePrice, TableProvidedServicePriceDto>().ReverseMap();
            #endregion
            #region Financial
            CreateMap<FinancialCard, FinancialCardDto>().ReverseMap();
            CreateMap<FinancialBankAccount, FinancialBankAccountDto>().ReverseMap();
            CreateMap<FinancialBillToPayList, FinancialBillToPayListDto>().ReverseMap();
            CreateMap<FinancialEssentialCycle, FinancialEssentialCycleDto>().ReverseMap();
            CreateMap<FinancialNotPredictable, FinancialNotPredictableDto>().ReverseMap();
            #endregion
            #region Shared
            CreateMap<Address, AddressDto>().ReverseMap();
            CreateMap<Contact, ContactDto>().ReverseMap();
            CreateMap<SocialNetwork, SocialNetworkDto>().ReverseMap();
            #endregion
            #region OutSourced
            CreateMap<CollectDeliver, CollectDeliverDto>().ReverseMap();
            CreateMap<BillingFrom, BillingFromDto>().ReverseMap();
            CreateMap<Destiny, DestinyDto>().ReverseMap();
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


