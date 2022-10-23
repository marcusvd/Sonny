using System.Collections.Generic;
using System.Threading.Tasks;
using Services.Dto;
using Services.Dto.ServiceBudgetBench;

namespace Services.Services.Contracts.BudgetBench
{
    public interface IServiceBudgetServices
    {
        Task<ServiceBudgetDto> AddAsync(ServiceBudgetDto record);
        Task<ServiceBudgetDto> GetByIdAsync(int id, bool included = false);
        Task<List<ServiceBudgetDto>> GetAllAsync(bool include = false);
        Task<ServiceBudgetDto> Update(ServiceBudgetDto record);
    }
}