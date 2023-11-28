using System.Collections.Generic;
using System.Threading.Tasks;
using Domain.Entities.StkProduct;
using Pagination.Models;
using Repository.Data.Operations.Repository;

namespace Repository.Data.Operations.ProductRepository.QuantitiesRepository
{
    public interface IQuantitiesProductRepository : IRepository<Quantity>
    {
         Task<List<Quantity>> GetMultplesById(List<int> ids);
         void UpdateRange(List<Quantity> entities);
        Task<Page<Quantity>> GetPaged(Params parameters);
    }
}