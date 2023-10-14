using System.Collections.Generic;
using System.Threading.Tasks;
using Application.Services.Operations.BenchBudgetService.Dtos;
using Pagination.Models;

namespace Application.Services.Operations.BenchBudgetService
{
    public interface IBudgetServiceGetServices
    {
        Task<PagedList<BudgetServiceDto>> GetAllPagedNoFinished(Params parameters);
        Task<int> GetCountByCompanyIdAsync(int companyId);
        Task<BudgetServiceDto> GetByCompanyIdBybudgetServiceId(int companyId, int budgetServiceId);
    }
}