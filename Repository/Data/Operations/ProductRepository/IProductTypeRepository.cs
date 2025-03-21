
using System.Collections.Generic;
using Domain.Entities.StockProduct.ProductKind;
using Repository.Data.Operations.Repository;

namespace Repository.Data.Operations.ProductRepository
{
    public interface IProductTypeRepository : IRepository<ProductType>
    {
        void UpdateRange(List<ProductType> entities);
    }
}