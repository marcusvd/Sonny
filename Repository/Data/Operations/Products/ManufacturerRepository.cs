using System.Threading.Tasks;
using Domain.Entities.Stocks;
using Repository.Data.Context;
using Repository.Data.Operations.Repository;

namespace Repository.Data.Operations.Products
{
    public class ManufacturerRepository : Repository<Manufacturer>, IManufacturerRepository
    {
        private readonly SonnyDbContext _CONTEXT;
        public ManufacturerRepository(SonnyDbContext CONTEXT):base(CONTEXT)
        {
            _CONTEXT = CONTEXT;
        }

          public async Task<bool> save()
        {
            return await _CONTEXT.SaveChangesAsync() > 0;
        }
    }
}