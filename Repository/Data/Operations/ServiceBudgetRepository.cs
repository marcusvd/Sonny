using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Repository.Contracts;
using Repository.Data.Context;
using Repository.Data.Contracts;

namespace Repository.Data.Operations
{
    public class ServiceBudgetRepository : Repository<ServiceBudget>, IServiceBudgetRepository
    {
        private SonnyDbContext _CONTEXT;
        public ServiceBudgetRepository(SonnyDbContext CONTEXT) : base(CONTEXT)
        {
            _CONTEXT = CONTEXT;
        }

        public async Task<List<ServiceBudget>> GetAllAsyncIncluded()
        {

            var query = await _CONTEXT.ServicesBudgets.AsNoTracking().Include(s => s.SolutionsPrices).Include(c => c.Client).ToListAsync();

            return query;
        }

        public async Task<ServiceBudget> GetByIdAsyncIncluded(int id)
        {
            var result = await _CONTEXT.ServicesBudgets.AsNoTracking()
            .Include(s => s.SolutionsPrices)
            .Include(c => c.Client)
            .FirstOrDefaultAsync(x => x.Id==id);
            return result;
        }


        // public async Task<IQueryable<ServiceBudget>> GetAllAsyncincluded()
        // {
        //     var query =  _CONTEXT.ServicesBudgets.AsNoTracking().Include(x => x.SolutionsPrices);

        //     return query;

        // }





    }
}