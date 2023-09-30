using System.Collections.Generic;
using System.Threading.Tasks;
using Application.Services.Operations.BenchBudgetService.Dtos;

namespace Application.Services.Operations.BenchBudgetService
{
    public interface ITableProvidedServicePriceAddServices
    {
        Task<KeyValuePair<string, int>> AddRangeAsync(List<TableProvidedServicePriceDto> entityDto);
    }
}