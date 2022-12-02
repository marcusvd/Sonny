using System.Threading.Tasks;
using Domain.Entities;
using Pagination;
using Services.Dto;
using Services.Dto.CollectsDelivers;

namespace Services.Services.Contracts
{
    public interface ICollectDeliverServices
    {
        Task<CollectDeliverDto> AddAsync(CollectDeliverDto record);
       // Task<CollectDeliverDto> EditAsync(int id, CollectDeliverDto record);
        //  Task<CollectDeliverDto[]> GetAllAsync();
      //  Task<CollectDeliverDto> GetByIdAsync(int id);
        // Task<CollectDeliverDto[]> GetAllAsync(Params pgParams);
       // Task<bool> DeleteAsync(int id);

        //right below
      //  Task<PagedListDto<CollectDeliverToView>> GetIntervalDatePagedAsync(PgParams pgParams);
//        Task<PagedListDto<CollectDeliverDto>> GetCurrentDatePagedAsync(PgParams pgParams);
      //  Task<PagedListDto<CollectDeliverDto>> GetAllPagedAsync(PgParams parameters);

    }
}