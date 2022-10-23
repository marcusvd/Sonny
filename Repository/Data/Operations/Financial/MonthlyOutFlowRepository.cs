using System.Linq;
using System.Threading.Tasks;
using Domain.Entities;
using Domain.Entities.Financial;
using Microsoft.EntityFrameworkCore;
using Repository.Data.Context;
using Repository.Data.Contracts;
using Repository.Data.Contracts.Financial;

namespace Repository.Data.Operations.Financial
{

    public class MonthlyOutFlowRepository : Repository<MonthlyOutFlow>, IMonthlyOutFlowRepository
    {
        private readonly SonnyDbContext _CONTEXT;
        public MonthlyOutFlowRepository(SonnyDbContext CONTEXT):base(CONTEXT)
        {
            _CONTEXT = CONTEXT;
        }
        public async Task<MonthlyOutFlow[]> GetAllAsync(bool include = false)
        {

            return await _CONTEXT.MonthlyOutFlows.AsNoTracking().ToArrayAsync();
        }

        public async Task<MonthlyOutFlow> GetByIdAsync(int Id, bool include = false)
        {
            Task<MonthlyOutFlow> monthlyOutFlow = _CONTEXT.MonthlyOutFlows.AsNoTracking().FirstOrDefaultAsync(_id => _id.Id == Id);
            return await monthlyOutFlow;
        }
    }
}