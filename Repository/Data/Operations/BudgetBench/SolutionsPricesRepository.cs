using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using Domain.Entities;
using Domain.Entities.BudgetBench;
using Microsoft.EntityFrameworkCore;
using Repository.Contracts;
using Repository.Data.Context;
using Repository.Data.Contracts;

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