using System.Net;
using Api.Helpers.Validators;
using FluentValidation;
using FluentValidation.AspNetCore;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.DependencyInjection;
using Newtonsoft.Json;
using Pagination;
using Services.Dto;
using Repository.Data.Contracts.Financial;
using Repository.Data.Operations.Financial;
using Repository.Data.Operations.BudgetBench;
using Services.Services.Operations.ServiceBudgetBench;
using Services.Services.Contracts.BudgetBench;
using Services.Services.Operations.BudgetBench;
using Services.Services.Operations;
using Services.Services.Contracts;
using UnitOfWork.Persistence.Contracts;
using UnitOfWork.Persistence.Operations;
using Services.Services.Contracts.Financial;
using Services.Services.Operations.Financial;
using Repository.Data.Contracts;
using Repository.Data.Operations;
using Services.Dto.Financial;
using Api.Helpers.Validators.Outsourced;
using Services.Dto.CollectsDelivers;
using Services.Services.Contracts.Outsourced;
using Repository.Data.Operations.Outsourced;
using Repository.Data.Contracts.Outsourced;
using Services.Services.Operations.Outsourced;
using Services.Dto.Outsourced;
using Services.Dto.ServiceBudgetBench;
using Api.Helpers.Validators.ServicesBudgetBench;
using Services.Services.BudgetBench.Contracts;
using Api.Helpers.Validators.Shared;
using Domain.Entities.GlobalSystem;
using Services.Dto.Shared;

namespace ExtensionMethods
{
    public static class Extensions
    {
        public static void AddPagination(this HttpResponse response,
        int currentPg, int itemsPerPg, int totalItems, int totalPg, bool hasNext, bool hasPrevious)
        {
            var paginationHeader = new PaginationHeader(currentPg, itemsPerPg, totalItems, totalPg, hasNext, hasPrevious);
            response.Headers.Add("Pagination", JsonConvert.SerializeObject(paginationHeader));
            response.Headers.Add("Access-Control-Expose-Header", "Pagination");
        }

    }
    public static class ApiExceptionMiddleware
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
    }
    public static class FluentValidationDependencyInjection
    {
        public static void AddScopedValidations(this IServiceCollection services)
        {
            services.AddFluentValidationAutoValidation()
            .AddFluentValidationClientsideAdapters();
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
            services.AddScoped<IValidator<EletronicRepairDto>, EletronicRepairValidator>();
            #endregion
            #region Inventory
            services.AddScoped<IValidator<InventoryDto>, InventoryValidator>();
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
    }
    public static class ServicesRepositoriesDependencyInjection
    {
        public static void AddScopedServicesRepositories(this IServiceCollection services)
        {
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
            services.AddScoped<IEletronicRepairServices, EletronicRepairServices>();
            services.AddScoped<IEletronicRepairRepository, EletronicRepairRepository>();
            services.AddScoped<ICollectDeliverServices, CollectDeliverServices>();
            services.AddScoped<ICollectDeliverRepository, CollectDeliverRepository>();
            #endregion            services.AddScoped<ICustomerRepository, CustomerRepository>();
            #region Inventory
            services.AddScoped<IInventoryRepository, InventoryRepository>();
            services.AddScoped<IInventoryServices, InventoryServices>();
            #endregion
            #region Customer
            services.AddScoped<ICustomerServices, CustomerServices>();
            #endregion
            #region Partner
            services.AddScoped<IPartnerServices, PartnerServices>();
            services.AddScoped<IPartnerRepository, PartnerRepository>();
            #endregion
            #region Company
            services.AddScoped<ICompanyService, CompanyService>();
            services.AddScoped<ICompanyRepository, CompanyRepository>();
            #endregion
            #region UnitOfWork
            services.AddScoped<IUnitOfWork, Worker>();
            #endregion
        }
    }

}