using System.Collections.Generic;
using System.Net;
using System.Threading.Tasks;
using Application.Services.Operations.Outsourced.Dtos;
using Pagination.Models;

namespace Application.Services.Operations.Outsourced
{
    public interface ICollectDeliverServices
    {
        Task<HttpStatusCode> AddAsync(CollectDeliverDto entityDto);
        Task<PagedList<CollectDeliverDto>> GetAllPagedAsync(Params parameters);
        Task<List<CollectDeliverDto>> GetAllByCompanyIdCurrentYearAsync(int id);
        Task<CollectDeliverDto> GetByIdAllIncluded(int collectDeliverId);
        Task<List<CollectDeliverDto>> GetAllByCompanyIdByMonthNumberCurrentYearAsync(LocalParams parameters);
        Task<HttpStatusCode> UpdateAsync(int collectDeliverId, CollectDeliverUpdateDto entity);
        Task<HttpStatusCode> DeleteFakeAsync(int collectDeliverId);
    }
}