using System.Collections.Generic;
using System.Threading.Tasks;
using Domain.Entities;
using Pagination;
using Repository.Contracts;

namespace Repository.Data.Contracts
{
    public interface ICustomerRepository : IRepository<Customer>
    {
        Task<List<Customer>> GetAllIncludedAsync();
        Task<Customer> GetByIdAllIncludedAsync(int id);
        Task<PagedList<Customer>> GetClientPagedAsync(PgParams parameters);

    }
}