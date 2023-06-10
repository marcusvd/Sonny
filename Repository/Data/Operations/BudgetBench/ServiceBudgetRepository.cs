using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using Domain.Entities;
using Domain.Entities.BudgetBench;
using Microsoft.EntityFrameworkCore;
using Repository.Data.Context;
using Repository.Data.Contracts;
using Repository.Data.Operations.Repository;

namespace Repository.Data.Operations.BudgetBench
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

            var result = await _CONTEXT.ServicesBudgets.AsNoTracking()
            .Include(s => s.SolutionsPrices)
            .Include(c => c.Customer).ToListAsync();

            return result;
        }

        public async Task<ServiceBudget> GetByIdAsyncIncluded(int id)
        {
            var result = await _CONTEXT.ServicesBudgets.AsNoTracking()
            .Include(s => s.SolutionsPrices)
            .Include(c => c.Customer)
            .FirstOrDefaultAsync(x => x.Id == id);
            return result;
        }






    }
}