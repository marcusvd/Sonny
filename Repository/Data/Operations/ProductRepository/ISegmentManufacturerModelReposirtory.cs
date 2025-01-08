
using System.Collections.Generic;
using Domain.Entities.StockProduct;
using Domain.Entities.StockProduct.ProductKind;
using Repository.Data.Operations.Repository;


namespace Repository.Data.Operations.ProductRepository
{
    public interface ISegmentReposirtory : IRepository<Segment>
    {
        void UpdateRange(List<Segment> entities);
    }
    public interface IManufacturerReposirtory : IRepository<Manufacturer>
    {
        void UpdateRange(List<Manufacturer> entities);
    }
    public interface IModelReposirtory : IRepository<Model>
    {
        void UpdateRange(List<Model> entities);
    }
    public interface ISpecificitiesReposirtory : IRepository<Specificities>
    {
        void UpdateRange(List<Specificities> entities);
    }
}
