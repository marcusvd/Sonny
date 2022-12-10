using System.Collections.Generic;
using System.Threading.Tasks;
using Services.Dto;

namespace Services.Services.Contracts
{
    public interface ICustomerServices
    {
        Task<CustomerDto> AddAsync(CustomerDto entityDto);
        Task<List<CustomerDto>> GetAllAsync();
        // Task<PagedListDto<CustomerDto>> GetAllPagedAsync(PgParams parameters);

    }
}