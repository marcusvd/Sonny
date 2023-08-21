
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain.Entities.ServicesBench;
using Microsoft.EntityFrameworkCore;
using Repository.Data.Context;
using Repository.Data.Operations.Repository;

namespace Repository.Data.Operations.BudgetBench
{
    public class BudgetServiceRepository : Repository<BudgetService>, IBudgetServiceRepository
    {
        private SonnyDbContext _CONTEXT;
        public BudgetServiceRepository(SonnyDbContext CONTEXT) : base(CONTEXT)
        {
            _CONTEXT = CONTEXT;
        }

        public async Task<CollectDeliverCosts> CollectDeliverCostsById(int id)
        {
            var CDeliversCosts = await _CONTEXT.CollectsDeliversCosts.AsNoTracking().SingleOrDefaultAsync(x => x.Id == id);
            return CDeliversCosts;
        }

    }
}