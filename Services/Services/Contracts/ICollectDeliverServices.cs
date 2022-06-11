using System.Threading.Tasks;
using Domain.Entities;
using Services.Dto;

namespace Services.Services.Contracts
{
    public interface ICollectDeliverServices
    {
        Task<CollectDeliverDto> AddAsync(CollectDeliverDto record);
        Task<CollectDeliverDto> EditAsync(int id, CollectDeliverDto record);
        Task<CollectDeliverDto[]> GetAllAsync();
        Task<CollectDeliverDto> GetByIdAsync(int id);
        Task<bool> DeleteAsync(int id);

    }
}