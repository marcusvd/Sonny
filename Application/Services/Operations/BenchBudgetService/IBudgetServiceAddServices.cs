using System.Threading.Tasks;
using Application.Services.Operations.BenchBudgetService.Dtos;

namespace Application.Services.Operations.BenchBudgetService
{
    public interface IBudgetServiceAddServices
    {
        Task<BudgetServiceDto> AddAsync(BudgetServiceDto entityDto);
        
    }
}