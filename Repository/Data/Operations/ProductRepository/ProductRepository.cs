using Repository.Data.Context;
using Repository.Data.Operations.Repository;
using Domain.Entities.StockProduct.ProductKind;

namespace Repository.Data.Operations.ProductRepository
{


    public class ProductRepository : Repository<Product>, IProductRepository
    {
        private readonly SonnyDbContext _CONTEXT;
        public ProductRepository(SonnyDbContext CONTEXT) : base(CONTEXT)
        {
            _CONTEXT = CONTEXT;
        }
    }

}