using Domain.Entities;
using Repository.Data.Context;
using Repository.Data.Contracts;

namespace Repository.Data.Operations
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