using System.Collections.Generic;
using Domain.Entities.Finances.CategorySubcategoryExpenses;
using Repository.Data.Operations.Repository;

namespace Repository.Data.Operations.Finances.CategorySubcategoryExpenses
{
    public interface ICategoryExpensesRepository : IRepository<CategoryExpense>
    {
        void AddRangeAsync(List<CategoryExpense> entities);
    }
}