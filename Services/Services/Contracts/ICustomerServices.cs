using System.Collections.Generic;
using System.Threading.Tasks;
using Pagination;
using Services.Dto;

namespace Services.Services.Contracts
{
    public interface ICustomerServices
    {
        Task<CustomerDto> AddAsync(CustomerDto record);
        Task<CustomerDto> EditAsync(int id, CustomerDto record);
        Task<bool> DeleteAsync(int id);
        Task<List<CustomerDto>> GetAllAsync();
        Task<List<CustomerDto>> GetAllIncludedAsync();
        Task<CustomerDto> GetByIdAsync(int id);
        Task<CustomerDto> GetByIdAllIncludedAsync(int id);
        //paged
        Task<PagedListDto<CustomerDto>> GetAllPagedAsync(PgParams parameters);

    }
}