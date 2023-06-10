using System.Threading.Tasks;
using Domain.Entities;
using Pagination.Models;
using Repository.Data.Operations.Repository;

namespace Repository.Data.Contracts.Customers
{
    public interface ICustomerRepository : IRepository<Customer>
    {
         Task<PagedList<Customer>> GetCustomersPagedAsync(Params parameters);

    }
}