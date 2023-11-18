using Domain.Entities.StkProduct;
using Repository.Data.Context;
using Repository.Data.Operations.Repository;

namespace Repository.Data.Operations.ProductRepository.QuantitiesRepository
{
    public class QuantitiesProductRepository : Repository<Quantity>, IQuantitiesProductRepository
    {
        private readonly SonnyDbContext _context;
        public QuantitiesProductRepository(SonnyDbContext context):base(context)
        {
            _context = context;
        }
    }
}