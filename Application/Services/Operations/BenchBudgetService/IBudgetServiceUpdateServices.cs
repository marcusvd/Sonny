using System.Collections.Generic;
using System.Threading.Tasks;
using Application.Services.Operations.BenchBudgetService.Dtos;


namespace Application.Services.Operations.BenchBudgetService
{
    public interface IBudgetServiceUpdateServices
    {
        Task<BudgetServiceDto> UpdateAsync(int BudgetServiceId, BudgetServiceDto entityDto);
    }
}