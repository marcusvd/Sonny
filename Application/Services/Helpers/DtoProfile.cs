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
using Domain.Entities.Finances.Bank;
using Application.Services.Operations.Finances.Dtos.Bank;
using Domain.Entities.Finances.MonthlyExpenses;
using Domain.Entities.Finances.CategorySubcategoryExpenses;
using Application.Services.Operations.Finances.Dtos.CategorySubcategoryExpenses;
using Domain.Entities.Finances.YearlyExpenses;
using Domain.Entities.Finances.VariablesDebitsExpenses;
using Application.Services.Operations.Finances.Dtos.FinancingsLoansExpenses;
using Domain.Entities.Finances.FinancingsLoansExpenses;
using Application.Services.Operations.Finances.Dtos.MonthlyExpenses;
using Application.Services.Operations.Finances.Dtos.YearlyExpenses;
using Application.Services.Operations.Finances.Dtos.VariableDebitExpenses;
using Domain.Entities.Finances.CreditCardExpenses;
using Application.Services.Operations.Finances.Dtos.CreditCardExpenses;
using Domain.Entities.Finances.PixExpenses;
using Application.Services.Operations.Finances.Dtos.PixExpenses;

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

            CreateMap<CollectDeliverCosts, CollectDeliverCostsDto>().ReverseMap();
            CreateMap<CostFromEnum, CostFromEnumDto>().ReverseMap();
            CreateMap<StatusServiceEnum, StatusServiceEnumDto>().ReverseMap();
            CreateMap<ExecutionModeEnum, ExecutionModeEnumDto>().ReverseMap();
            CreateMap<TableProvidedServicePrice, TableProvidedServicePriceDto>().ReverseMap();
            #endregion
            
            #region Financial
            CreateMap<Card, CardDto>().ReverseMap();
            CreateMap<CreditCardLimitOperation, CreditCardLimitOperationDto>().ReverseMap();
            CreateMap<Pix, PixDto>().ReverseMap();
            CreateMap<BankAccount, BankAccountDto>().ReverseMap();
            
            CreateMap<CategoryExpense, CategoryExpenseDto>().ReverseMap();
            CreateMap<SubcategoryExpense, SubcategoryExpenseDto>().ReverseMap();

            CreateMap<MonthlyFixedExpense, MonthlyFixedExpenseDto>().ReverseMap();
            // CreateMap<MonthlyFixedExpenseTracking, MonthlyFixedExpenseTrackingDto>().ReverseMap();
            
            CreateMap<FinancingAndLoanExpense, FinancingAndLoanExpenseDto>().ReverseMap();
            CreateMap<FinancingAndLoanExpenseInstallment, FinancingAndLoanExpenseInstallmentDto>().ReverseMap();

            // CreateMap<FinancingAndLoanExpenseTracking, FinancingAndLoanExpenseTrackingDto>().ReverseMap();
            
            CreateMap<YearlyFixedExpense, YearlyFixedExpenseDto>().ReverseMap();
            // CreateMap<YearlyFixedExpenseTracking, YearlyFixedExpenseTrackingDto>().ReverseMap();
            
            CreateMap<VariableExpense, VariableExpenseDto>().ReverseMap();
            
            CreateMap<CreditCardExpense, CreditCardExpenseDto>().ReverseMap();
            CreateMap<CreditCardExpenseInvoice, CreditCardExpenseInvoiceDto>().ReverseMap();
            CreateMap<PixExpense, PixExpenseDto>().ReverseMap();
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


