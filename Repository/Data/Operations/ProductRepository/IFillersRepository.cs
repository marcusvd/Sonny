
using Repository.Data.Operations.Repository;
using Domain.Entities.StkProduct;
using System.Collections.Generic;
using System.Threading.Tasks;
using Pagination.Models;
using Domain.Entities.Fill.StkProduct;

namespace Repository.Data.Operations.ProductRepository
{
    public interface IItemFillRepository : IRepository<Item>
    {
        // void AddRangeAsync(List<Item> entities);
        // void UpdateRange(List<Item> entities);
        Task<Item> GetByName(int companyId, string name);
    }
    public interface IModelFillRepository : IRepository<Model>
    {
        void AddRangeAsync(List<Model> entities);
    }
    public interface IManufacturerFillRepository : IRepository<Manufacturer>
    {
        void AddRangeAsync(List<Manufacturer> entities);
        //Task<int> GetByName(string name);
    }
    public interface ISegmentFillRepository : IRepository<Segment>
    {
        void AddRangeAsync(List<Segment> entities);
    }
}