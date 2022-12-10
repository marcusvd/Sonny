using Domain.Entities;
using Repository.Contracts;

namespace Repository.Data.Contracts
{
    public interface ICustomerRepository : IRepository<Customer>
    {
        // Task<PagedList<Customer>> GetClientPagedAsync(PgParams parameters);
    }
}