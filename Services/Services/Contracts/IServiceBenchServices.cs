using System.Collections.Generic;
using System.Threading.Tasks;
using Services.Dto;
using Services.Dto.ServiceBudgetBench;

namespace Services.Services.Contracts
{
    public interface IServiceBenchServices
    {
        Task<ServiceBenchDto> AddAsync(ServiceBenchDto record);
        Task<ServiceBenchDto> GetByIdAsync(int id, bool included);
        Task<List<ServiceBenchDto>> GetAllAsync(bool include = false);
        Task<ServiceBenchDto> Update(ServiceBenchDto record);
    }
}