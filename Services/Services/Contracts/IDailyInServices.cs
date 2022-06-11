using System.Threading.Tasks;

namespace Services.Services.Contracts
{
    public interface IDailyInServices
    {
        Task<DailyInFlowDto> AddAsync<DailyInFlowDto>(DailyInFlowDto record);
        Task<bool> Remove<DailyInFlowDto>(int Id);
        Task<DailyInFlowDto> EditAsync<DailyInFlowDto>(int Id, DailyInFlowDto record);
        Task<DailyInFlowDto[]> GetAllAsync<DailyInFlowDto>();
        Task<DailyInFlowDto> GetByIdAsync<DailyInFlowDto>(int Id);
    }
}