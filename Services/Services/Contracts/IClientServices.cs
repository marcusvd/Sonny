using System.Collections.Generic;
using System.Threading.Tasks;
using Pagination;
using Services.Dto;

namespace Services.Services.Contracts
{
    public interface IClientServices
    {
        Task<ClientDto> AddAsync(ClientDto record);
        Task<ClientDto> EditAsync(int id, ClientDto record);
        Task<bool> DeleteAsync(int id);
        Task<List<ClientDto>> GetAllAsync();
        Task<List<ClientDto>> GetAllIncludedAsync();
        Task<ClientDto> GetByIdAsync(int id);
        Task<ClientDto> GetByIdAllIncludedAsync(int id);
        //paged
        Task<PagedListDto<ClientDto>> GetAllPagedAsync(PgParams parameters);

    }
}