using Domain.Entities.BudgetBench;
using Microsoft.EntityFrameworkCore;
using Repository.Data.Context;
using Repository.Data.Contracts;
using Repository.Data.Operations.Repository;

namespace Repository.Data.Operations.BudgetBench
{
    public class SolutionsPricesRepository : Repository<SolutionPrice>, ISolutionsPricesRepository
    {
        private readonly SonnyDbContext _CONTEXT;
        public SolutionsPricesRepository(SonnyDbContext CONTEXT) : base(CONTEXT)
        {
            _CONTEXT = CONTEXT;
        }

        public void DeleteAsync(int id)
        {
            using (var solutionPrice = _CONTEXT.SolutionsPrices.AsNoTracking().FirstOrDefaultAsync(solutionPrice => solutionPrice.Id == id))
            {
                _CONTEXT.SolutionsPrices.Remove(solutionPrice.Result);
            }
        }
    }
}