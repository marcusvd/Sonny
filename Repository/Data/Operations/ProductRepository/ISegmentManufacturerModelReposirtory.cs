
using Domain.Entities.StockProduct;
using Domain.Entities.StockProduct.ProductKind;
using Repository.Data.Operations.Repository;


namespace Repository.Data.Operations.ProductRepository
{
    public interface ISegmentReposirtory : IRepository<Segment>
    {

    }
    public interface IManufacturerReposirtory : IRepository<Manufacturer>
    {

    }
    public interface IModelReposirtory : IRepository<Model>
    {

    }
}
