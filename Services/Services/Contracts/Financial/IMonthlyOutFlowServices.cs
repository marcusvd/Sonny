using System.Threading.Tasks;
using Services.Dto.Financial;

namespace Services.Services.Contracts.Financial
{
    public interface IMonthlyOutFlowServices
    {
        Task<MonthlyOutFlowDto> AddAsync(MonthlyOutFlowDto record);
        Task<MonthlyOutFlowDto> EditAsync(int Id, MonthlyOutFlowDto record);
        Task<MonthlyOutFlowDto> Remove(int Id);
        Task<MonthlyOutFlowDto[]> GetAllAsync();
        Task<MonthlyOutFlowDto> GetByIdAsync(int Id);
        
    }
}