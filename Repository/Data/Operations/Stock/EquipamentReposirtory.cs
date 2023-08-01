using System.Threading.Tasks;
using Domain.Entities.Stocks;
using Repository.Data.Context;
using Repository.Data.Operations.Repository;


namespace Repository.Data.Operations.Stock
{
    public class EquipamentRepository : Repository<EquipamentType>, IEquipamentRepository
    {
        private readonly SonnyDbContext _CONTEXT;
        public EquipamentRepository(SonnyDbContext CONTEXT) : base(CONTEXT)
        {
            _CONTEXT = CONTEXT;
        }

        public async Task<bool> save()
        {
            return await _CONTEXT.SaveChangesAsync() > 0;
        }
    }
}