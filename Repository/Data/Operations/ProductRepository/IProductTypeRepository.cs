
using Domain.Entities.StockProduct.ProductKind;
using Repository.Data.Operations.Repository;

namespace Repository.Data.Operations.ProductRepository
{
    public interface IProductTypeRepository : IRepository<ProductType>
    {
        // void AddRangeAsync(List<Item> entities);
        // void UpdateRange(List<Item> entities);

    }
    // public interface IModelFillRepository : IRepository<Model>
    // {
    //     void AddRangeAsync(List<Model> entities);
    // }
    // public interface IManufacturerFillRepository : IRepository<Manufacturer>
    // {
    //     void AddRangeAsync(List<Manufacturer> entities);
    //     //Task<int> GetByName(string name);
    // }
    // public interface ISegmentFillRepository : IRepository<Segment>
    // {
    //     void AddRangeAsync(List<Segment> entities);
    // }
}