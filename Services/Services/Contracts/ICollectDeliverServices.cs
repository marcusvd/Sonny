using System.Threading.Tasks;
using Domain.Entities;
using Pagination;
using Services.Dto;

namespace Services.Services.Contracts
{
    public interface ICollectDeliverServices
    {
        Task<CollectDeliverDto> AddAsync(CollectDeliverDto record);
        Task<CollectDeliverDto> EditAsync(int id, CollectDeliverDto record);
      //  Task<CollectDeliverDto[]> GetAllAsync();
        Task<CollectDeliverDto> GetByIdAsync(int id);
        // Task<CollectDeliverDto[]> GetAllAsync(Params pgParams);
        Task<CollectDeliverDto[]> GetCurrentDatePagedAsync(Params pgParams);
        Task<CollectDeliverDto[]> GetAllPagedAsync(Params pgParams);
        
        Task<bool> DeleteAsync(int id);

    }
}