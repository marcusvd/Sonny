using System.Collections.Generic;
using Domain.Entities.Finances;
using Domain.Entities.Finances.PixExpenses;
using Domain.Entities.Finances.VariablesDebitsExpenses;
using Repository.Data.Operations.Repository;

namespace Repository.Data.Operations.Finances.PixesExpenses
{
    public interface IPixesExpensesRepository : IRepository<PixExpense>
    {
        void AddAsync(PixExpense entity);
    }
}