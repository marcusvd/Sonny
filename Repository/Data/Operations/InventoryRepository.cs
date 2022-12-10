using Domain.Entities;
using Repository.Data.Context;
using Repository.Data.Contracts;
namespace Repository.Data.Operations
{

    public class InventoryRepository : Repository<Inventory>, IInventoryRepository
    {
        private readonly SonnyDbContext _CONTEXT;
        public InventoryRepository(SonnyDbContext CONTEXT) : base(CONTEXT)
        {
            _CONTEXT = CONTEXT;
        }
    
    }

}

