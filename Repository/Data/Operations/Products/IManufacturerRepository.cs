using System.Collections.Generic;
using System.Threading.Tasks;
using Domain.Entities.Product;
using Pagination.Models;
using Repository.Data.Operations.Repository;

namespace Repository.Data.Operations.Products
{
    public interface IManufacturerRepository : IRepository<Manufacturer>
    {
        void AddRangeAsync(List<Manufacturer> entities);
        Task<PagedList<Manufacturer>> GetManufacturersPagedAsync(Params parameters);
    }
}