using System.Collections.Generic;
using System.Threading.Tasks;
using Application.Dto.ServiceBudgetBench;

namespace Application.Services.Contracts.BudgetBench
{
    public interface IServiceBudgetServices
    {
        Task<ServiceBudgetDto> AddAsync(ServiceBudgetDto entityDto);
        Task<ServiceBudgetDto> GetByIdAsyncIncluded(int id);
        Task<List<ServiceBudgetDto>> GetAllAsyncIncluded();
        Task<ServiceBudgetDto> Update(ServiceBudgetDto entityDto);

    }
}