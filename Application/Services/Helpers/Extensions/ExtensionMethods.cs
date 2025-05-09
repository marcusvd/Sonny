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
using Application.Services.Shared.Dtos;
using Application.Services.Shared.DtoValidation;
using Repository.Data.Operations.Finances;
using Application.Services.Operations.Finances.DtoValidation;
using Application.Services.Operations.Finances.Dtos;
using Application.Services.Operations.BenchBudgetService.Dtos;
using Application.Services.Operations.BenchBudgetService.DtoValidation;
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
using Repository.Data.Operations.Finances.CreditCardExpenses;
using Repository.Data.Operations.Finances.CreditCardInvoiceExpense;
using Application.Services.Operations.Finances.CommonForServices;
using Application.Services.Operations.Finances.PixesExpenses;
using Repository.Data.Operations.Finances.PixesExpenses;
using Application.Services.Operations.Finances.Dtos.Mappers;
using Application.Services.Operations.Outsourced.Dtos.Mappers;
using Application.Services.Operations.Main.Customers.Dtos.Mappers;
using Application.Services.Operations.Main.Partners.Dtos.Mappers;
using Application.Services.Operations.StockProduct.ProductKind;
using Application.Services.Operations.StockProduct;
using Application.Services.Operations.StockProduct.Dtos.Mappers;
using Application.Services.Operations.RemoteCmd;
using Application.Services.Operations.RemoteCmd.Dtos.Mappers;
using Application.Services.Shared.Dtos.Mappers;


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
            #region ObjectMapper
            services.AddScoped<ICommonObjectMapper, CommonObjectMapper>();
            #endregion
           
            #region Products
            services.AddScoped<IProductServices, ProductServices>();
            services.AddScoped<IProductChildrenServices, ProductChildrenServices>();
            services.AddScoped<IStockProductObjectMapperServices, StockProductObjectMapperServices>();

            #endregion
            #region Accounts
            services.AddScoped<IAccountServices, AccountServices>();
            #endregion
            #region Finances
            services.AddScoped<IBankAccountsServices, BankAccountsServices>();
            services.AddScoped<IBankAccountRepository, BankAccountRepository>();

            services.AddScoped<ICreditCardLimitOperationsRepository, CreditCardLimitOperationsRepository>();

            services.AddScoped<ICategoryExpensesServices, CategoryExpensesServices>();
            services.AddScoped<ICategoryExpensesRepository, CategoryExpensesRepository>();

            services.AddScoped<ICommonForFinancialServices, CommonForFinancialServices>();

            services.AddScoped<IFinancialObjectMapperServices, FinancialObjectMapperServices>();

            services.AddScoped<IFinancingsAndLoansExpensesServices, FinancingsAndLoansExpensesServices>();
            services.AddScoped<IFinancingsAndLoansExpensesRepository, FinancingsAndLoansExpensesRepository>();

            services.AddScoped<IMonthlyFixedExpensesServices, MonthlyFixedExpensesServices>();
            services.AddScoped<IMonthlyFixedExpensesRepository, MonthlyFixedExpensesRepository>();

            services.AddScoped<IYearlyFixedExpensesServices, YearlyFixedExpensesServices>();
            services.AddScoped<IYearlyFixedExpensesRepository, YearlyFixedExpensesRepository>();

            services.AddScoped<ICreditCardExpensesServices, CreditCardExpensesServices>();
            services.AddScoped<ICreditCardExpensesRepository, CreditCardExpensesRepository>();

            services.AddScoped<ICreditCardExpensesInvoiceServices, CreditCardExpensesInvoiceServices>();
            services.AddScoped<ICreditCardExpenseInvoicesRepository, CreditCardExpenseInvoicesRepository>();

            services.AddScoped<IVariablesExpensesServices, VariablesExpensesServices>();
            services.AddScoped<IVariablesExpensesRepository, VariablesExpensesRepository>();

            services.AddScoped<IPixesExpensesServices, PixesExpensesServices>();
            services.AddScoped<IPixesExpensesRepository, PixesExpensesRepository>();
            #endregion
            #region BudgetServiceBench
            services.AddScoped<IBudgetServiceRepository, BudgetServiceRepository>();

            // services.AddScoped<IBudgetServiceAddServices, BudgetServiceAddServices>();
            // services.AddScoped<IBudgetServiceGetServices, BudgetServiceGetServices>();
            // services.AddScoped<IOpenBudgetServiceServices, OpenBudgetServiceServices>();
            // services.AddScoped<ITableProvidedServicePriceAddServices, TableProvidedServicePriceAddServices>();
            // services.AddScoped<ITableProvidedServicePriceGetServices, TableProvidedServicePriceGetServices>();
            #endregion
            #region Outsourced

            services.AddScoped<IOutsourcedObjectMapperServices, OutsourcedObjectMapperServices>();
            // services.AddScoped<IElectronicRepairServices, ElectronicRepairServices>();
            services.AddScoped<IElectronicRepairRepository, ElectronicRepairRepository>();
            services.AddScoped<ICollectDeliverServices, CollectDeliverServices>();
            services.AddScoped<ICollectDeliverRepository, CollectDeliverRepository>();

            #endregion
            #region Customer
            services.AddScoped<ICustomerObjectMapperServices, CustomerObjectMapperServices>();
            services.AddScoped<ICustomerAddServices, CustomerAddServices>();
            services.AddScoped<ICustomerSearchService, CustomerSearchService>();
            services.AddScoped<ICustomerGetServices, CustomerGetServices>();
            services.AddScoped<ICustomerUpdateServices, CustomerUpdateServices>();
            services.AddScoped<ICustomerRepository, CustomerRepository>();
            #endregion
            #region Partner
            services.AddScoped<IPartnerObjectMapperServices, PartnerObjectMapperServices>();
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
            #region RemoteCmd          
            services.AddScoped<IRemoteCmdMachineServices, RemoteCmdMachineServices>();
            services.AddScoped<IRemoteCmdMachineObjectMapperServices, RemoteCmdMachineObjectMapperServices>();
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
            // #region Stock
            // services.AddScoped<IValidator<EquipamentDto>, EquipamentDtoValidator>();
            // services.AddScoped<IValidator<ProductDto>, ProductDtoValidator>();
            // services.AddScoped<IValidator<QuantityDto>, QuantityDtoValidator>();
            // services.AddScoped<IValidator<TrackingDto>, TrackingDtoValidator>();
            // #endregion
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
