using Repository.Data.Context;
using Repository.Data.Operations.Repository;
using Domain.Entities.StockProduct.ProductKind;
using System.Collections.Generic;

namespace Repository.Data.Operations.ProductRepository
{


    public class ProductTypeRepository : Repository<ProductType>, IProductTypeRepository
    {
        private readonly SonnyDbContext _CONTEXT;
        public ProductTypeRepository(SonnyDbContext CONTEXT) : base(CONTEXT)
        {
            _CONTEXT = CONTEXT;
        }

        public void UpdateRange(List<ProductType> entities)
        {
            _CONTEXT.PD_ProductTypes.UpdateRange(entities);
        }
    }

}