using System.Collections.Generic;
using System.Threading.Tasks;
using Application.Dto.ServiceBudgetBench;

namespace Application.Services.Contracts.BudgetBench
{
    public interface IServiceBenchServices
    {
        Task<ServiceBenchDto> AddAsync(ServiceBenchDto entityDto);
        Task<List<ServiceBenchDto>> GetAllAsyncIncluded();
        Task<ServiceBenchDto> Update(int id, ServiceBenchDto entityDto);
    }
}