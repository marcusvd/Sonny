using System.Linq;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;
using Domain.Entities;
using Repository.Data.Context;
using Repository.Data.Contracts;

namespace Repository.Data.Operations
{
    public class DailyOutRepository : Repository<DailyOutFlow>, IDailyOutRepository
    {
        private readonly SonnyDbContext _CONTEXT;
        public DailyOutRepository(SonnyDbContext CONTEXT):base(CONTEXT)
        {
            _CONTEXT = CONTEXT;
        }
        public async Task<DailyOutFlow[]> GetAllAsync(bool include = false)
        {
            IQueryable<DailyOutFlow> query = _CONTEXT.DailyOutFlows
            .AsNoTracking();
            if (include)
            {
                query = query
                           .Include(_typepayment => _typepayment.Typepayment)
                           .Include(_checkingaccount => _checkingaccount.Checkingaccount);
            }
            return await query.ToArrayAsync();
        }

        public async Task<DailyOutFlow> GetByIdsync(int Id, bool include = false)
        {
            IQueryable<DailyOutFlow> query = _CONTEXT.DailyOutFlows
          .AsNoTracking();
            if (include)
            {
                query = query
                           .Include(_typepayment => _typepayment.Typepayment)
                           .Include(_checkingaccount => _checkingaccount.Checkingaccount);
            }
            return await query.FirstOrDefaultAsync(__id => __id.Id == Id);
        }
    }
}