using System.Threading.Tasks;
using Application.Services.Operations.Outsourced.Dtos;

namespace Application.Services.Operations.Outsourced
{
    public interface ICollectDeliverServices
    {
        Task<CollectDeliverDto> AddAsync(CollectDeliverDto record);
        //  Task<PagedListDto<CollectDeliverToView>> GetIntervalDatePagedAsync(PgParams pgParams);
        //  Task<PagedListDto<CollectDeliverDto>> GetCurrentDatePagedAsync(PgParams pgParams);
        //  Task<PagedListDto<CollectDeliverDto>> GetAllPagedAsync(PgParams parameters);

    }
}