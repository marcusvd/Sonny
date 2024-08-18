using Repository.Data.Context;
using Domain.Entities.Finances;
using Repository.Data.Operations.Repository;
using Domain.Entities.Finances.CategorySubcategoryExpenses;
using System.Collections.Generic;

namespace Repository.Data.Operations.Finances.CategorySubcategoryExpenses
{
    public class CategoryExpensesRepository : Repository<CategoryExpense>, ICategoryExpensesRepository
    {
        private readonly SonnyDbContext _CONTEXT;
        public CategoryExpensesRepository(SonnyDbContext CONTEXT) : base(CONTEXT)
        {
            _CONTEXT = CONTEXT;
        }

        public async void AddRangeAsync(List<CategoryExpense> entities)
        {
            await _CONTEXT.FN_CategoriesExpenses.AddRangeAsync(entities);
        }
    }
}