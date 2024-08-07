using AutoMapper;
using Domain.Entities.Shared;
using Domain.Entities.Outsourced;
using Domain.Entities.Authentication;
using Domain.Entities.StkProduct;
using Application.Services.Operations.ProductServices.Dtos;
using Application.Services.Operations.Outsourced.Dtos;
using Domain.Entities.ServicesBench;
using Application.Services.Operations.BenchBudgetService.Dtos;
using Domain.Entities.Main;
using Domain.Entities.Main.Companies;
using Domain.Entities.Main.Customers;
using Application.Services.Operations.Main.Customers.Dtos;
using Domain.Entities.Main.Inheritances;
using Application.Services.Operations.Main.Partners.Dtos;
using Application.Services.Operations.Main.Companies.Dtos;
using Application.Services.Operations.Authentication.Dtos;
using Application.Services.Shared.Dtos.Address;
using Application.Services.Shared.Dtos.Contact;
using Domain.Entities.Finances;
using Application.Services.Operations.Finances.Dtos;
using Application.Services.Operations.BenchBudgetService.Dtos.Enums;
using Domain.Entities.ServicesBench.Enums;
using Application.Services.Operations.Finances.Dtos.Enums;
using Domain.Entities.Finances.Enums;
using Application.Services.Operations.Outsourced.Dtos.Enums;
using Domain.Entities.Outsourced.Enums;
using Domain.Entities.Fill.StkProduct;
using Application.Services.Operations.ProductServices.Dtos.Fill;
using Domain.Entities.Main.Partners;
using Application.Services.Operations.Main.Inheritances;
using Application.Services.Operations.Main.Inheritances.Enums;
using Domain.Entities.Main.Inheritances.Enums;

namespace Application.Services.Helpers
{
    public class DtoProfile : Profile
    {
        public DtoProfile()
        {
            #region Main
            CreateMap<MainEntitiesBaseDto,MainEntitiesBase>().ReverseMap();
            CreateMap<Partner, PartnerDto>().ReverseMap();
            CreateMap<PaymentData, PaymentDataDto>().ReverseMap();
            CreateMap<PartnerPaymentPix, PartnerPaymentPixDto>().ReverseMap();
            CreateMap<PartnerPaymentBankAccount, PartnerPaymentBankAccountDto>().ReverseMap();

            CreateMap<Customer, CustomerDto>().ReverseMap();
            CreateMap<AdditionalCosts, AdditionalCostsDto>().ReverseMap();
            CreateMap<PhysicallyMovingCosts, PhysicallyMovingCostsDto>().ReverseMap();
            #endregion

            CreateMap<EntityTypeEnum, EntityTypeEnumDto>().ReverseMap();

            #region Authentication
            CreateMap<MyUser, MyUserDto>().ReverseMap();
            #endregion
            #region BudgetServicesBench
            CreateMap<BudgetService, BudgetServiceDto>().ReverseMap();
            CreateMap<BudgetServiceDto, BudgetService>().ReverseMap();
            CreateMap<Service, ServiceDto>().ReverseMap();
            CreateMap<Repair, RepairDto>().ReverseMap();

            // CreateMap<ServiceDto,ServiceViewDto>().ReverseMap();
            CreateMap<CollectDeliverCosts, CollectDeliverCostsDto>().ReverseMap();
            CreateMap<CostFromEnum, CostFromEnumDto>().ReverseMap();
            CreateMap<StatusServiceEnum, StatusServiceEnumDto>().ReverseMap();
            CreateMap<ExecutionModeEnum, ExecutionModeEnumDto>().ReverseMap();
            CreateMap<TableProvidedServicePrice, TableProvidedServicePriceDto>().ReverseMap();
            #endregion
            #region Financial
            CreateMap<Card, CardDto>().ReverseMap();
            CreateMap<Pix, PixDto>().ReverseMap();
            CreateMap<BankAccount, BankAccountDto>().ReverseMap();
            CreateMap<MonthFixedExpenses, MonthFixedExpensesDto>().ReverseMap();
            CreateMap<CategoryExpenses, CategoryExpensesDto>().ReverseMap();
            CreateMap<SubcategoryExpenses, SubcategoryExpensesDto>().ReverseMap();
            CreateMap<MonthFixedExpensesTracking, MonthFixedExpensesTrackingDto>().ReverseMap();
            
            CreateMap<YearlyFixedExpenses, YearlyFixedExpensesDto>().ReverseMap();
            // CreateMap<YearlyFixedExpensesFillers, YearlyFixedExpensesFillersDto>().ReverseMap();
            CreateMap<YearlyFixedExpensesTracking, YearlyFixedExpensesTrackingDto>().ReverseMap();
            CreateMap<ExpensesNotPredictable, FinancialExpensesNotPredictableDto>().ReverseMap();
            //Enums
            CreateMap<TypeAccountEnum, TypeAccountEnumDto>().ReverseMap();
            CreateMap<TypeCardEnum, TypeCardEnumDto>().ReverseMap();
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
            CreateMap<StatusServiceEletronicReparEnum, StatusServiceEletronicRepairEnumDto>().ReverseMap();
            #endregion
            #region Company
            CreateMap<Company, CompanyDto>().ReverseMap();
            #endregion

            #region Product
            CreateMap<Equipament, EquipamentDto>().ReverseMap();
            CreateMap<Item, ItemDto>().ReverseMap();
            CreateMap<Product, ProductDto>().ReverseMap();
            CreateMap<Quantity, QuantityDto>().ReverseMap();
            CreateMap<Tracking, TrackingDto>().ReverseMap();
            CreateMap<Manufacturer, ManufacturerDto>().ReverseMap();
            CreateMap<Segment, SegmentDto>().ReverseMap();
            CreateMap<Model, ModelDto>().ReverseMap();
            #endregion

        }
    }
}


