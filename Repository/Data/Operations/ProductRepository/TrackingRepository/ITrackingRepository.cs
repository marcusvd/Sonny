using System.Collections.Generic;
using System.Threading.Tasks;
using Domain.Entities.StkProduct;
using Pagination.Models;
using Repository.Data.Operations.Repository;

namespace Repository.Data.Operations.ProductRepository.QuantitiesRepository
{
    public interface ITrackingRepository : IRepository<Tracking>
    {
        void AddRangeAsync(List<Tracking> entities);
    }
}