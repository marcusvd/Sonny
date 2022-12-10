using System.Collections.Generic;
using System.Threading.Tasks;
using Services.Dto.ServiceBudgetBench;

namespace Services.Services.Contracts.BudgetBench
{
    public interface IServiceBenchServices
    {
        Task<ServiceBenchDto> AddAsync(ServiceBenchDto entityDto);
        Task<List<ServiceBenchDto>> GetAllAsyncIncluded();
        Task<ServiceBenchDto> Update(int id, ServiceBenchDto entityDto);
    }
}