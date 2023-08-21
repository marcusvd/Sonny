using System.Threading.Tasks;
using Domain.Entities;
using Domain.Entities.Main.Customers;
using Pagination.Models;
using Repository.Data.Operations.Repository;

namespace Repository.Data.Operations.Main.Customers
{
    public interface ICustomerRepository : IRepository<Customer>
    {
         Task<PagedList<Customer>> GetCustomersPagedAsync(Params parameters);
         Task<Customer> GetByIdAIcludedPhysicallyMovingCostsAsync(int companyId, int customerId);

    }
}