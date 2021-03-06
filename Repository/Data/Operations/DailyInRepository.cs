using System.Linq;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;
using Domain.Entities;
using Repository.Data.Context;
using Repository.Data.Contracts;

namespace Repository.Data.Operations
{
    public class DailyInRepository : Repository<DailyInFlow>, IDailyInRepository
    {
        private readonly SonnyDbContext _CONTEXT;
        public DailyInRepository(SonnyDbContext CONTEXT) : base(CONTEXT)
        {
            _CONTEXT = CONTEXT;
        }
        public async Task<DailyInFlow[]> GetAllAsync(bool include = false)
        {

            IQueryable<DailyInFlow> query = _CONTEXT.DailyInFlows
            .AsNoTracking();


            if (include)
            {
                query = query
                .Include(_clients => _clients.Client)
                           .Include(_typepayment => _typepayment.Typepayment)
                           .Include(_checkingaccount => _checkingaccount.Checkingaccount);
            }
            return await query.ToArrayAsync();

        }

        public async Task<DailyInFlow> GetByIdsync(int Id, bool include = false)
        {
            IQueryable<DailyInFlow> query = _CONTEXT.DailyInFlows
          .AsNoTracking();
            if (include)
            {
                query = query
                .Include(_clients => _clients.Client)
                           .Include(_typepayment => _typepayment.Typepayment)
                           .Include(_checkingaccount => _checkingaccount.Checkingaccount);
            }
            return await query.FirstOrDefaultAsync(__id => __id.Id == Id);

        }
    }
}