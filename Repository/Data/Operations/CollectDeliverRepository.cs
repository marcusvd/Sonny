using System.Threading.Tasks;
using Domain.Entities;
using Repository.Data.Context;
using Repository.Data.Contracts;
using Microsoft.EntityFrameworkCore;

namespace Repository.Data.Operations
{
    public class CollectDeliverRepository : Repository<CollectDeliver>, ICollectDeliverRepository
    {

        private readonly SonnyDbContext _CONTEXT;
        public CollectDeliverRepository(SonnyDbContext CONTEXT) : base(CONTEXT)
        {
            _CONTEXT = CONTEXT;
        }

        public async Task<CollectDeliver> GetByIdIncluded(int id)
        {
            var result = await _CONTEXT.CollectsDelivers.AsNoTracking()
            .Include(x => x.DestinyAddress)
            .Include(x => x.SourceAddress)
            .Include(x => x.Transporter).FirstOrDefaultAsync(x => x.Id == id);

            return result;
        }


        //  public async Task<bool> save()
        // {
        //     if (await _CONTEXT.SaveChangesAsync() > 0)
        //     {
        //         return true;
        //     }
        //     return false;
        // }

    }
}