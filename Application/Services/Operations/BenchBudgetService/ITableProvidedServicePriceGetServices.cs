using System.Collections.Generic;
using System.Threading.Tasks;
using Application.Services.Operations.BenchBudgetService.Dtos;

namespace Application.Services.Operations.BenchBudgetService
{
    public interface ITableProvidedServicePriceGetServices
    {
        Task<List<TableProvidedServicePriceDto>> GetAllAsync(int companyId);
    }
}