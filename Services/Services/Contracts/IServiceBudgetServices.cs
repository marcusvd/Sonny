using System.Collections.Generic;
using System.Threading.Tasks;
using Services.Dto;
namespace Services.Services.Contracts
{
    public interface IServiceBudgetServices
    {
        Task<ServiceBudgetDto> AddAsync(ServiceBudgetDto record);
        // Task<CardDto> EditAsync(int id, CardDto record);
        // Task<bool> DeleteAsync(int id);
        Task<ServiceBudgetDto> GetByIdAsync(int id, bool included);

        Task<List<ServiceBudgetDto>> GetAllAsync(bool include = false);

        Task<ServiceBudgetDto> Update(ServiceBudgetDto record);
    }
}