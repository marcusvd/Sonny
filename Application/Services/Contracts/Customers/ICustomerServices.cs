using System.Collections.Generic;
using System.Threading.Tasks;
using Application.Dto;
using Pagination.Models;
using Services.Dto;

namespace Application.Services.Contracts.Customers
{
    public interface ICustomerServices
    {
        Task<CustomerDto> AddAsync(CustomerDto entityDto);
        Task<List<CustomerDto>> GetAllAsync();
         Task<PagedListDto<CustomerDto>> GetAllPagedAsync(Params parameters);
         

    }
}