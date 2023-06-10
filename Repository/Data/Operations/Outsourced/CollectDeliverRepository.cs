using Repository.Data.Context;
using Domain.Entities.Outsourced;
using Repository.Data.Operations.Repository;

namespace Repository.Data.Operations.Outsourced
{
    public class CollectDeliverRepository : Repository<CollectDeliver>, ICollectDeliverRepository
    {

        private readonly SonnyDbContext _CONTEXT;
        public CollectDeliverRepository(SonnyDbContext CONTEXT) : base(CONTEXT)
        {
            _CONTEXT = CONTEXT;
        }

      
    }
}