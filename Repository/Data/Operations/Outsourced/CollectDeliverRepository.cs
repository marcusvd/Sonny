using Repository.Data.Context;
//using Pagination;
using Domain.Entities.Outsourced;


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