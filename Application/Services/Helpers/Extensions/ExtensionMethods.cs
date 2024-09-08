using System.Net;
using FluentValidation;
using FluentValidation.AspNetCore;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.DependencyInjection;
using UnitOfWork.Persistence.Operations;
using Repository.Data.Operations.Outsourced;
using Application.Services.Operations.Outsourced;
using Domain.Entities.GlobalSystem;
using Application.Services.Helpers.Validators.Outsourced;
using Application.Services.Operations.Authentication;
using Application.Services.Operations.ProductServices;
using Application.Services.Operations.ProductServices.DtoValidation;
using Application.Services.Operations.ProductServices.Dtos;
using Application.Services.Operations.Outsourced.Dtos;
using Application.Services.Operations.Outsourced.DtoValidation;
using Repository.Data.Operations.ServicesBench;
using Repository.Data.Operations.BudgetBench;
using Application.Services.Operations.BenchBudgetService;
using Application.Services.Operations.Main.Partners.DtoValidation;
using Application.Services.Operations.Main.Partners.Dtos;
using Application.Services.Operations.Main.Partners;
using Application.Services.Operations.Main.Customers.DtoValidation;
using Application.Services.Operations.Main.Customers.Dtos;
using Application.Services.Operations.Main.Customers;
using Application.Services.Operations.Main.Companies;
using Repository.Data.Operations.Main.Customers;
using Repository.Data.Operations.Main.Companies;
using Repository.Data.Operations.Main.Partners;
using Application.Services.Operations.Authentication.Dtos;
using Application.Services.Operations.Authentication.DtoValidation;
using Application.Services.Shared.Dtos.Contact;
using Application.Services.Shared.Dtos.Address;
using Application.Services.Shared.DtoValidation;
using Repository.Data.Operations.Finances;
using Application.Services.Operations.Finances.DtoValidation;
using Application.Services.Operations.Finances.Dtos;
using Application.Services.Operations.BenchBudgetService.Dtos;
using Application.Services.Operations.BenchBudgetService.DtoValidation;
using Repository.Data.Operations.ProductRepository;
using Application.Services.Operations.ProductServices.QuantitiesServices;
using Repository.Data.Operations.ProductRepository.QuantitiesRepository;
using Application.Services.Operations.Main.Customers.Search;
using Application.Services.Operations.Finances.CategorySubcategoryExpenses;
using Application.Services.Operations.Finances.Bank;
using Application.Services.Operations.Finances.MonthlyExpenses;
using Repository.Data.Operations.Finances.MonthlyExpenses;
using Repository.Data.Operations.Finances.CategorySubcategoryExpenses;
using Application.Services.Operations.Finances.YearlyExpenses;
using Repository.Data.Operations.Finances.YearlyExpenses;
using Repository.Data.Operations.Finances.VariablesDebitsExpenses;
using Application.Services.Operations.Finances.Dtos.Bank;
using Application.Services.Operations.Finances.VariablesDebitsExpenses;
using Application.Services.Shared.Seed.EntitiesSeed;
using Application.Services.Operations.Finances.FinancingsLoansExpenses;
using Application.Services.Operations.Finances.FinancingLoansExpenses.FinancingLoansExpenses;
using Repository.Data.Operations.Finances.FinancingsLoansExpenses;
using Application.Services.Operations.Finances.Dtos.MonthlyExpenses;
using Application.Services.Operations.Finances.Dtos.VariableDebitExpenses;
using Application.Services.Operations.Finances.CreditCardExpenses;


namespace Application.Services.Helpers.Extensions
{
    public static class ExtensionMethods
    {
        public static void ConfigureExceptionHandler(this IApplicationBuilder app)
        {
            app.UseExceptionHandler(appError =>
            {
                appError.Run(async context =>
                {
                    context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;
                    context.Response.ContentType = "application/json";

                    var contextFeature = context.Features.Get<IExceptionHandlerFeature>();
                    if (contextFeature != null)
                    {
                        await context.Response.WriteAsync(new GlobalErrorHandling()
                        {
                            StatusCode = context.Response.StatusCode,
                            Message = contextFeature.Error.Message,
                            Trace = contextFeature.Error.StackTrace
                        }.ToString());
                    }
                });
            });
        }
        public static void AddScopedDependencyInjection(this IServiceCollection services)
        {

            #region seed
            services.AddScoped<SeedSonnyDbServices>();
            #endregion

            #region Products
            services.AddScoped<IProductsAddServices, ProductsAddServices>();
            services.AddScoped<IProductsGetServices, ProductsGetServices>();
            services.AddScoped<IProductsUpdateServices, ProductsUpdateServices>();
            services.AddScoped<IProductsTrackingGetServices, ProductsTrackingGetServices>();
            services.AddScoped<IEquipamentRepository, EquipamentRepository>();
            services.AddScoped<IItemFillCrudServices, ItemFillCrudServices>();
            // services.AddScoped<IEquipamentAddServices, EquipamentAddServices>();
            services.AddScoped<IEquipamentGetServices, EquipamentGetServices>();

            services.AddScoped<IQuantitiesGetServices, QuantitiesGetServices>();
            services.AddScoped<IQuantitiesUpdateServices, QuantitiesUpdateServices>();
            services.AddScoped<IQuantitiesProductRepository, QuantitiesProductRepository>();


            #endregion
            #region Accounts
            services.AddScoped<IAccountServices, AccountServices>();
            #endregion
            #region Finances
            services.AddScoped<IFnBanksAccountsServices, FnBanksAccountsServices>();
            services.AddScoped<IBankAccountRepository, BankAccountRepository>();

            services.AddScoped<ICategoryExpensesServices, CategoryExpensesServices>();
            services.AddScoped<ICategoryExpensesRepository, CategoryExpensesRepository>();

            services.AddScoped<IFinancingsAndLoansExpensesServices, FinancingsAndLoansExpensesServices>();
            services.AddScoped<IFinancingsAndLoansExpensesRepository, FinancingsAndLoansExpensesRepository>();


            services.AddScoped<IMonthlyFixedExpensesServices, MonthlyFixedExpensesServices>();
            services.AddScoped<IMonthlyFixedExpensesRepository, MonthlyFixedExpensesRepository>();
            // services.AddScoped<IMonthlyFixedExpensesTrackingServices, MonthlyFixedExpensesTrackingServices>();
            // services.AddScoped<IMonthlyFixedExpensesTrackingRepository, MonthlyFixedExpensesTrackingRepository>();


            services.AddScoped<IYearlyFixedExpensesServices, YearlyFixedExpensesServices>();
            services.AddScoped<IYearlyFixedExpensesRepository, YearlyFixedExpensesRepository>();

            services.AddScoped<ICreditCardExpensesServices, CreditCardExpensesServices>();
            services.AddScoped<ICreditCardExpensesRepository, CreditCardExpensesRepository>();
            // services.AddScoped<IYearlyFixedExpensesTrackingServices, YearlyFixedExpensesTrackingServices>();
            // services.AddScoped<IYearlyFixedExpensesTrackingRepository, YearlyFixedExpensesTrackingRepository>();

            services.AddScoped<IVariablesExpensesServices, VariablesExpensesServices>();
            services.AddScoped<IVariablesExpensesRepository, VariablesExpensesRepository>();
            #endregion
            #region BudgetServiceBench
            services.AddScoped<IBudgetServiceRepository, BudgetServiceRepository>();

            services.AddScoped<IBudgetServiceAddServices, BudgetServiceAddServices>();
            services.AddScoped<IBudgetServiceGetServices, BudgetServiceGetServices>();
            services.AddScoped<IOpenBudgetServiceServices, OpenBudgetServiceServices>();
            services.AddScoped<ITableProvidedServicePriceAddServices, TableProvidedServicePriceAddServices>();
            services.AddScoped<ITableProvidedServicePriceGetServices, TableProvidedServicePriceGetServices>();
            #endregion
            #region Outsourced
            services.AddScoped<IElectronicRepairServices, ElectronicRepairServices>();
            services.AddScoped<IElectronicRepairRepository, ElectronicRepairRepository>();
            services.AddScoped<ICollectDeliverServices, CollectDeliverServices>();
            services.AddScoped<ICollectDeliverRepository, CollectDeliverRepository>();
            #endregion            
            #region Customer
            services.AddScoped<ICustomerAddServices, CustomerAddServices>();
            services.AddScoped<ICustomerSearchService, CustomerSearchService>();
            services.AddScoped<ICustomerGetServices, CustomerGetServices>();
            services.AddScoped<ICustomerUpdateServices, CustomerUpdateServices>();
            services.AddScoped<ICustomerRepository, CustomerRepository>();
            #endregion
            #region Partner
            services.AddScoped<IPartnerAddServices, PartnerAddServices>();
            services.AddScoped<IPartnerRepository, PartnerRepository>();
            services.AddScoped<IPartnerGetServices, PartnerGetServices>();
            services.AddScoped<IPartnerUpdateServices, PartnerUpdateServices>();
            #endregion
            #region Company
            services.AddScoped<ICompanyAddService, CompanyAddService>();
            services.AddScoped<ICompanyGetService, CompanyGetService>();
            services.AddScoped<ICompanyRepository, CompanyRepository>();
            #endregion
            #region Addresses
            // services.AddScoped<IAddressesRepository, AddressesRepository>();
            // services.AddScoped<IAddressesServices, AddressesServices>();
            #endregion
            #region Contacts
            // services.AddScoped<IContactsRepository, ContactsRepository>();
            // services.AddScoped<IContactsServices, ContactsServices>();
            #endregion
            #region UnitOfWork
            services.AddScoped<IUnitOfWork, Worker>();
            #endregion
            #region MailServers
            services.AddScoped<EmailServer>();
            services.AddScoped<Email>();
            #endregion
            #region Tests1
            services.AddScoped<ITableProvidedServicesPricesRepository, TableProvidedServicesPricesRepository>();

            #endregion
        }
        public static void AddScopedValidations(this IServiceCollection services)
        {
            services.AddFluentValidationAutoValidation()
            .AddFluentValidationClientsideAdapters();
            #region Authentication
            services.AddScoped<IValidator<MyUserDto>, MyUserValidator>();
            #endregion
            #region Finances
            services.AddScoped<IValidator<BankAccountDto>, BankAccountDtoValidator>();
            services.AddScoped<IValidator<MonthlyFixedExpenseDto>, MonthlyFixedExpensesDtoValidator>();
            services.AddScoped<IValidator<VariableExpenseDto>, VariableExpensesDtoValidator>();
            // services.AddScoped<IValidator<MonthlyFixedExpenseTrackingDto>, MonthlyFixedExpensesTrackingDtoValidator>();
            #endregion
            #region BudgetServiceBench
            services.AddScoped<IValidator<BudgetServiceDto>, BudgetServiceDtoValidator>();
            services.AddScoped<IValidator<CollectDeliverCostsDto>, CollectDeliverCostsDtoValidator>();
            services.AddScoped<IValidator<RepairDto>, RepairDtoValidator>();
            services.AddScoped<IValidator<ServiceDto>, ServiceDtoValidator>();
            services.AddScoped<IValidator<TableProvidedServicePriceDto>, TableProvidedServicePriceDtoValidator>();
            #endregion
            #region Outsourced
            services.AddScoped<IValidator<CollectDeliverDto>, CollectDeliveryDtoValidator>();
            services.AddScoped<IValidator<ElectronicRepairDto>, ElectronicRepairValidator>();
            #endregion
            #region Stock
            services.AddScoped<IValidator<EquipamentDto>, EquipamentDtoValidator>();
            services.AddScoped<IValidator<ProductDto>, ProductDtoValidator>();
            services.AddScoped<IValidator<QuantityDto>, QuantityDtoValidator>();
            services.AddScoped<IValidator<TrackingDto>, TrackingDtoValidator>();
            #endregion
            #region Customer
            services.AddScoped<IValidator<CustomerDto>, CustomerDtoValidator>();
            #endregion
            #region Partner
            services.AddScoped<IValidator<PartnerDto>, PartnerDtoValidator>();
            #endregion
            #region Shared
            services.AddScoped<IValidator<ContactDto>, ContactValidator>();
            services.AddScoped<IValidator<AddressDto>, AddressValidator>();
            #endregion
            #region Tests
            #endregion
        }

        public static void ConfigsStartupProject(this IServiceCollection services)
        {
            services.AddControllers().AddNewtonsoftJson(opt =>
            {
                opt.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore;
            });
        }


    }

}
