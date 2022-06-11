using System.Threading.Tasks;
using Services.Dto;


namespace Services.Services.Contracts
{
    public interface IDailyOutServices
    {
        Task<DailyOutFlowDto> AddAsync<DailyOutFlowDto>(DailyOutFlowDto record);
        Task<bool> Remove<DailyOutFlowDto>(int Id);
        Task<DailyOutFlowDto> EditAsync<DailyOutFlowDto>(int Id, DailyOutFlowDto record);
        Task<DailyOutFlowDto[]> GetAllAsync<DailyOutFlowDto>();
        Task<DailyOutFlowDto> GetByIdAsync<DailyOutFlowDto>(int Id);
    }
}