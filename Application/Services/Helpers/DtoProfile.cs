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
using Application.Services.Operations.Main.Customers.Enums;
using Domain.Entities.Main.Enums;
using Application.Services.Operations.Main.Inheritances;

namespace Application.Services.Helpers
{
    public class DtoProfile : Profile
    {
        public DtoProfile()
        {
            //             #region Inheritances


            //               // CreateMap<MainEntitiesBaseDto,MainEntitiesBase>()
            //             // .Include<CustomerDto,Customer>();


            //             // CreateMap<CustomerDto,Customer>();

            //             CreateMap<MainEntitiesBase, MainEntitiesBaseDto>()
            //             .IncludeAllDerived();

            // CreateMap<Customer, CustomerDto>().ReverseMap();
            #region Main
            CreateMap<MainEntitiesBaseDto,MainEntitiesBase>().ReverseMap();
            CreateMap<Partner, PartnerDto>().ReverseMap();
            CreateMap<Customer, CustomerDto>().ReverseMap();
            CreateMap<AdditionalCosts, AdditionalCostsDto>().ReverseMap();
            CreateMap<PhysicallyMovingCosts, PhysicallyMovingCostsDto>().ReverseMap();
            #endregion

            //             CreateMap<PhysicallyMovingCosts, PhysicallyMovingCostsDto>().ReverseMap();
            //             #endregion
            //             #region Customer
            //             CreateMap<AdditionalCosts, AdditionalCostsDto>().ReverseMap();
            //             // CreateMap<TypeCustomerEnum, TypeCustomerEnumDto>().ReverseMap();
            //             #endregion

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
            CreateMap<FinancialCard, FinancialCardDto>().ReverseMap();
            CreateMap<FinancialBankAccount, FinancialBankAccountDto>().ReverseMap();
            CreateMap<FinancialExpenses, FinancialExpensesDto>().ReverseMap();
            CreateMap<FinancialEssentialExpenses, FinancialEssentialExpensesDto>().ReverseMap();
            CreateMap<FinancialExpensesNotPredictable, FinancialExpensesNotPredictableDto>().ReverseMap();
            //Enums
            CreateMap<CyclePaymentEnum, CyclePaymentEnumDto>().ReverseMap();
            CreateMap<PaidByEnum, PaidByEnumDto>().ReverseMap();
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
            CreateMap<Product, ProductDto>().ReverseMap();
            CreateMap<Quantity, QuantityDto>().ReverseMap();
            CreateMap<Tracking, TrackingDto>().ReverseMap();
            CreateMap<Equipament_Fill, Equipament_FillDto>().ReverseMap();
            CreateMap<Manufacturer_Fill, Manufacturer_FillDto>().ReverseMap();
            CreateMap<Segment_Fill, Segment_FillDto>().ReverseMap();
            #endregion

        }
    }
}


