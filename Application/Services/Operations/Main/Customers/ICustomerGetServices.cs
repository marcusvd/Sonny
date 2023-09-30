using System.Collections.Generic;
using System.Threading.Tasks;
using Application.Services.Operations.Main.Customers.Dtos;
using Pagination.Models;

namespace Application.Services.Operations.Main.Customers
{
    public interface ICustomerGetServices
    {
        Task<List<CustomerDto>> GetAllAsync();
        Task<List<CustomerDto>> GetAllByCompanyIdAsync(int id);
        Task<int> GetCountByCompanyIdAsync(int id);
        Task<PagedList<CustomerDto>> GetAllPagedAsync(Params parameters);
    }
}