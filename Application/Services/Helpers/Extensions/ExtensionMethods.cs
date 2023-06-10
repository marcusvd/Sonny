using System.Net;
using FluentValidation;
using FluentValidation.AspNetCore;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.DependencyInjection;
using Application.Dto;
using Repository.Data.Contracts.Financial;
using Repository.Data.Operations.Financial;
using Repository.Data.Operations.BudgetBench;
using Application.Services.Operations.ServiceBudgetBench;
using Application.Services.Contracts.BudgetBench;
using Application.Services.Operations.BudgetBench;
using Application.Services.Operations;
using Application.Services.Contracts;
using UnitOfWork.Persistence.Contracts;
using UnitOfWork.Persistence.Operations;
using Application.Services.Contracts.Financial;
using Application.Services.Operations.Financial;
using Repository.Data.Contracts;
using Repository.Data.Operations;
using Application.Dto.Financial;
using Application.Dto.Outsourced;
using Repository.Data.Operations.Outsourced;
using Application.Services.Operations.Outsourced;
using Application.Dto.ServiceBudgetBench;
using Application.Services.BudgetBench.Contracts;
using Domain.Entities.GlobalSystem;
using Application.Dto.Shared;
using Application.Services.Helpers.Validators;
using Application.Services.Helpers.Validators.Shared;
using Application.Services.Helpers.Validators.Financial;
using Application.Services.Helpers.Validators.ServicesBudgetBench;
using Application.Services.Helpers.Validators.Outsourced;
using Application.Services.Operations.Customers;
using Repository.Data.Contracts.Customers;
using Application.Services.Contracts.Authentication;
using Application.Services.Operations.Authentication;
using Repository.Data.PersonalData.Contracts;
using Repository.Data.PersonalData.Operations;
using Application.Services.PersonalData.Contracts;
using Application.Services.PersonalData.Operations;
using Application.Dto.Authentication;
using Application.Services.Helpers.Validators.Authentication;
using Authentication.Services.Operations;
using Application.Services.Operations.Partners;
using Application.Services.Operations.Stocks;
using Repository.Data.Operations.Stocks;
using Repository.Data.Operations.Partners;

namespace Application.Services.Helpers.Extensions
{
    // public static class Extensions
    // {
    //     public static void AddPagination(this HttpResponse response,
    //     int currentPg, int itemsPerPg, int totalItems, int totalPg, bool hasNext, bool hasPrevious)
    //     {
    //         var paginationHeader = new PaginationHeader(currentPg, itemsPerPg, totalItems, totalPg, hasNext, hasPrevious);
    //         response.Headers.Add("Pagination", JsonConvert.SerializeObject(paginationHeader));
    //         response.Headers.Add("Access-Control-Expose-Header", "Pagination");
    //     }

    // }
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
            #region Financial
            services.AddScoped<ITypePaymentServices, TypePaymentServices>();
            services.AddScoped<ITypePaymentRepository, TypePaymentRepository>();
            services.AddScoped<ICheckingAccountServices, CheckingAccountServices>();
            services.AddScoped<ICheckingAccountRepository, CheckingAccountRepository>();
            services.AddScoped<IEssentialExpenseRepository, EssentialExpenseRepository>();
            services.AddScoped<IEssentialExpenseServices, EssentialExpenseServices>();
            services.AddScoped<IFinancingLoanRepository, FinancingLoanRepository>();
            services.AddScoped<IFinancingLoanServices, FinancingLoanServices>();
            #endregion
            #region BudgetBench
            services.AddScoped<ISolutionsPricesRepository, SolutionsPricesRepository>();
            services.AddScoped<ISolutionsPricesServices, SolutionsPricesServices>();
            services.AddScoped<IServiceBudgetRepository, ServiceBudgetRepository>();
            services.AddScoped<IServiceBudgetServices, ServiceBudgetServices>();
            services.AddScoped<IServiceBenchRepository, ServiceBenchRepository>();
            services.AddScoped<IServiceBenchServices, ServiceBenchServices>();
            #endregion
            #region Outsourced
            services.AddScoped<IElectronicRepairServices, ElectronicRepairServices>();
            services.AddScoped<IElectronicRepairRepository, ElectronicRepairRepository>();
            services.AddScoped<ICollectDeliverServices, CollectDeliverServices>();
            services.AddScoped<ICollectDeliverRepository, CollectDeliverRepository>();
            #endregion            
            #region Stock
            services.AddScoped<IStockRepository, StockRepository>();
            services.AddScoped<IStockServices, StockServices>();
            #endregion
            #region Customer
            services.AddScoped<ICustomerServices, CustomerServices>();
            services.AddScoped<ICustomerRepository, CustomerRepository>();
            #endregion
            #region Partner
            services.AddScoped<IPartnerServices, PartnerServices>();
            services.AddScoped<IPartnerRepository, PartnerRepository>();
            #endregion
            #region Company
            services.AddScoped<ICompanyService, CompanyService>();
            services.AddScoped<ICompanyRepository, CompanyRepository>();
            #endregion
            #region Addresses
            services.AddScoped<IAddressesRepository, AddressesRepository>();
            services.AddScoped<IAddressesServices, AddressesServices>();
            #endregion
            #region Contacts
            services.AddScoped<IContactsRepository, ContactsRepository>();
            services.AddScoped<IContactsServices, ContactsServices>();
            #endregion
            #region UnitOfWork
            services.AddScoped<IUnitOfWork, Worker>();
            #endregion
            #region MailServers
            services.AddScoped<EmailServer>();
            services.AddScoped<Email>();
            #endregion
        }
        public static void AddScopedValidations(this IServiceCollection services)
        {
            services.AddFluentValidationAutoValidation()
            .AddFluentValidationClientsideAdapters();
            #region Authentication
            services.AddScoped<IValidator<MyUserDto>, MyUserValidator>();
            #endregion
            #region Financial
            services.AddScoped<IValidator<SolutionPriceDto>, SolutionPriceValidator>();
            services.AddScoped<IValidator<TypePaymentDto>, TypePaymentValidator>();
            services.AddScoped<IValidator<CheckingAccountDto>, CheckingAccountValidator>();
            services.AddScoped<IValidator<EssentialExpenseDto>, EssentialExpenseValidator>();
            services.AddScoped<IValidator<FinancingLoanDto>, FinancingLoanValidator>();
            #endregion
            #region BudgetBench
            services.AddScoped<IValidator<ServiceBudgetDto>, ServiceBudgetValidator>();
            #endregion
            #region Outsourced
            services.AddScoped<IValidator<CollectDeliverDto>, CollectDeliveryValidator>();
            services.AddScoped<IValidator<ElectronicRepairDto>, ElectronicRepairValidator>();
            #endregion
            #region Stock
            services.AddScoped<IValidator<StockDto>, StockValidator>();
            #endregion
            #region Customer
            services.AddScoped<IValidator<CustomerDto>, CustomerValidator>();
            #endregion
            #region Partner
            services.AddScoped<IValidator<PartnerDto>, PartnerValidator>();
            #endregion
            #region Shared
            services.AddScoped<IValidator<ContactDto>, ContactValidator>();
            services.AddScoped<IValidator<AddressDto>, AddressValidator>();
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
