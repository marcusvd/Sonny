
using Domain.Entities.ServicesBench;
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

//         public async Task<List<ServiceBudget>> GetAllAsyncIncluded()
//         {

//             var result = await _CONTEXT.ServicesBudgets.AsNoTracking()
//             .Include(s => s.SolutionsPrices)
//             .Include(c => c.Customer).ToListAsync();

//             return result;
//         }

//         public async Task<ServiceBudget> GetByIdAsyncIncluded(int id)
//         {
//             var result = await _CONTEXT.ServicesBudgets.AsNoTracking()
//             .Include(s => s.SolutionsPrices)
//             .Include(c => c.Customer)
//             .FirstOrDefaultAsync(x => x.Id == id);
//             return result;
//         }






    }
}