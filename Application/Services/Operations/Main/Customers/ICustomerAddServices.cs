using System.Collections.Generic;
using System.Threading.Tasks;
using Application.Services.Operations.Main.Customers.Dtos;
using Application.Services.Shared.Dtos.Pagination;
using Pagination.Models;

namespace Application.Services.Operations.Main.Customers
{
    public interface ICustomerAddServices
    {
        Task<CustomerDto> AddAsync(CustomerDto entityDto);
        Task<List<CustomerDto>> GetAllAsync();
        Task<List<CustomerDto>> GetAllByCompanyIdAsync(int id);
        Task<int> GetCountByCompanyIdAsync(int id);
        Task<PagedListDto<CustomerDto>> GetAllPagedAsync(Params parameters);
    }
}