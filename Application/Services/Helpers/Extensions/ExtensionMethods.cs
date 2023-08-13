using System.Net;
using FluentValidation;
using FluentValidation.AspNetCore;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.DependencyInjection;
using UnitOfWork.Persistence.Contracts;
using UnitOfWork.Persistence.Operations;
using Repository.Data.Operations.Outsourced;
using Application.Services.Operations.Outsourced;
using Domain.Entities.GlobalSystem;
using Application.Services.Helpers.Validators.Outsourced;
using Application.Services.Operations.Authentication;
using Application.Services.Operations.Products;
using Application.Services.Operations.Products.DtoValidation;
using Repository.Data.Operations.Products;
using Application.Services.Operations.Products.Dtos;
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
using Application.Services.Operations.Finances;
using Repository.Data.Operations.Finances;

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
            #region Accounts
            services.AddScoped<IAccountServices, AccountServices>();
            #endregion
            #region Finances
            services.AddScoped<IFinancialBankAccountServices, FinancialBankAccountServices>();
            services.AddScoped<IFinancialBankAccountRepository, FinancialBankAccountRepository>();
            services.AddScoped<IFinancialBillToPayListServices, FinancialBillToPayListServices>();
            services.AddScoped<IFinancialBillToPayListRepository, FinancialBillToPayListRepository>();
            services.AddScoped<IFinancialEssentialCycleServices, FinancialEssentialCycleServices>();
            services.AddScoped<IFinancialEssentialCycleRepository, FinancialEssentialCycleRepository>();
            services.AddScoped<IFinancialNotPredictableServices, FinancialNotPredictableServices>();
            services.AddScoped<IFinancialNotPredictableRepository, FinancialNotPredictableRepository>();
            // services.AddScoped<ICheckingAccountServices, CheckingAccountServices>();
            // services.AddScoped<ICheckingAccountRepository, CheckingAccountRepository>();
            // services.AddScoped<IEssentialExpenseRepository, EssentialExpenseRepository>();
            // services.AddScoped<IEssentialExpenseServices, EssentialExpenseServices>();
            // services.AddScoped<IFinancingLoanRepository, FinancingLoanRepository>();
            // services.AddScoped<IFinancingLoanServices, FinancingLoanServices>();
            #endregion
            #region WorkBench
            // services.AddScoped<IServiceBudgetRepository, ServiceBudgetRepository>();
            // services.AddScoped<IServiceBudgetServices, ServiceBudgetServices>();
            // services.AddScoped<IServiceBenchRepository, ServiceBenchRepository>();
            // services.AddScoped<IServiceBenchServices, ServiceBenchServices>();
            #endregion
            #region Outsourced
            services.AddScoped<IElectronicRepairServices, ElectronicRepairServices>();
            services.AddScoped<IElectronicRepairRepository, ElectronicRepairRepository>();
            services.AddScoped<ICollectDeliverServices, CollectDeliverServices>();
            services.AddScoped<ICollectDeliverRepository, CollectDeliverRepository>();
            #endregion            
            #region Customer
            services.AddScoped<ICustomerAddServices, CustomerAddServices>();
            services.AddScoped<ICustomerRepository, CustomerRepository>();
            #endregion
            #region Partner
            services.AddScoped<IPartnerAddServices, PartnerAddServices>();
            services.AddScoped<IPartnerRepository, PartnerRepository>();
            #endregion
            #region Company
            services.AddScoped<ICompanyAddService, CompanyAddService>();
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
            #region Products
            services.AddScoped<IProductsAddServices, ProductsAddServices>();
            services.AddScoped<IProductsUpdateServices, ProductsUpdateServices>();
            services.AddScoped<IEquipamentRepository, EquipamentRepository>();
            services.AddScoped<IEquipamentAddServices, EquipamentAddServices>();
            services.AddScoped<IManufacturerAddServices, ManufacturerAddServices>();
            services.AddScoped<IManufacturerRepository, ManufacturerRepository>();
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
            // services.AddScoped<IValidator<TypePaymentDto>, TypePaymentValidator>();
            // services.AddScoped<IValidator<CheckingAccountDto>, CheckingAccountValidator>();
            // services.AddScoped<IValidator<EssentialExpenseDto>, EssentialExpenseValidator>();
            // services.AddScoped<IValidator<FinancingLoanDto>, FinancingLoanValidator>();
            #endregion
            #region BenchBudgetService
            services.AddScoped<IBudgetServiceRepository, BudgetServiceRepository>();
            services.AddScoped<IBudgetServiceAddServices, BudgetServiceAddServices>();
            services.AddScoped<IOpenBudgetServiceServices, OpenBudgetServiceServices>();
            #endregion
            #region Outsourced
            services.AddScoped<IValidator<CollectDeliverDto>, CollectDeliveryDtoValidator>();
            // services.AddScoped<IValidator<BillingFromDto>, BillingFromDtoValidator>();
            // services.AddScoped<IValidator<DestinyDto>, DestinyDtoValidator>();
            services.AddScoped<IValidator<ElectronicRepairDto>, ElectronicRepairValidator>();
            #endregion
            #region Stock
            services.AddScoped<IValidator<EquipamentTypeDto>, EquipamentTypeDtoValidator>();
            services.AddScoped<IValidator<ManufacturerDto>, ManufacturerDtoValidator>();
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
