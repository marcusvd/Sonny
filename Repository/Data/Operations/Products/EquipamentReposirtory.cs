using System.Threading.Tasks;
using Domain.Entities.Stocks;
using Repository.Data.Context;
using Repository.Data.Operations.Repository;


namespace Repository.Data.Operations.Products
{
    public class EquipamentRepository : Repository<EquipamentType>, IEquipamentRepository
    {
        private readonly SonnyDbContext _CONTEXT;
        public EquipamentRepository(SonnyDbContext CONTEXT) : base(CONTEXT)
        {
            _CONTEXT = CONTEXT;
        }
    }
}