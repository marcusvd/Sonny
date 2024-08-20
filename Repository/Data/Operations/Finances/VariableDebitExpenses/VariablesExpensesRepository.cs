using Domain.Entities.Finances.VariablesDebitsExpenses;
using Repository.Data.Operations.Finances.VariablesDebitsExpenses;
using Repository.Data.Context;
using Repository.Data.Operations.Repository;
using System.Collections.Generic;

namespace Repository.Data.Operations.Finances
{
    public class VariablesExpensesRepository : Repository<VariableExpense>, IVariablesExpensesRepository
    {
        private readonly SonnyDbContext _CONTEXT;
        public VariablesExpensesRepository(SonnyDbContext CONTEXT) : base(CONTEXT)
        {
            _CONTEXT = CONTEXT;
        }

        public async void AddRangeAsync(List<VariableExpense> entities)
        {
           await _CONTEXT.FN_VariablesExpenses.AddRangeAsync(entities);
        }
    }
}