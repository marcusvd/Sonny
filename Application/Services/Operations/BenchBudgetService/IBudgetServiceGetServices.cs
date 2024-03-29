using System.Collections.Generic;
using System.Threading.Tasks;
using Application.Services.Operations.BenchBudgetService.Dtos;
using Pagination.Models;

namespace Application.Services.Operations.BenchBudgetService
{
    public interface IBudgetServiceGetServices
    {
        // Task<BudgetServiceDto> GetBudgetServiceByIdAllIncludedAsync(int budgetServiceId);
        Task<Page<BudgetServiceDto>> GetBudgetCustomerIncludeAsync(Params parameters);
        Task<Page<BudgetServiceDto>> GetServiceByIdCustomerAsync(Params parameters);
        Task<BudgetServiceDto> GetByIdIncludeAsync(int budgetServiceId);
        Task<BudgetServiceDto> GetByIdAsync(int budgetServiceId);
        Task<Page<BudgetServiceDto>> GetServiceCustomerIncludeAsync(Params parameters);
        Task<int> GetBudgetCountByCompanyIdAsync(int companyId);
        Task<int> GetServiceCountByCompanyIdAsync(int companyId);
        Task<int> GetServicesCountByCustomerIdAsync(int customerId);
        Task<int> GetCountByCustomerIdAsync(int customerId);
       
    }
}