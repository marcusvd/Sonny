using System.Threading.Tasks;
using Application.Dto.CollectsDelivers;

namespace Application.Services.Contracts.Outsourced
{
    public interface ICollectDeliverServices
    {
        Task<CollectDeliverDto> AddAsync(CollectDeliverDto record);
        //  Task<PagedListDto<CollectDeliverToView>> GetIntervalDatePagedAsync(PgParams pgParams);
        //  Task<PagedListDto<CollectDeliverDto>> GetCurrentDatePagedAsync(PgParams pgParams);
        //  Task<PagedListDto<CollectDeliverDto>> GetAllPagedAsync(PgParams parameters);

    }
}