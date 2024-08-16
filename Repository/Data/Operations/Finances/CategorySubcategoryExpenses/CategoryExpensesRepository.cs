using Repository.Data.Context;
using Domain.Entities.Finances;
using Repository.Data.Operations.Repository;
using Domain.Entities.Finances.CategorySubcategoryExpenses;

namespace Repository.Data.Operations.Finances.CategorySubcategoryExpenses
{
    public class CategoryExpensesRepository : Repository<CategoryExpenses>, ICategoryExpensesRepository
    {
        private readonly SonnyDbContext _CONTEXT;
        public CategoryExpensesRepository(SonnyDbContext CONTEXT) : base(CONTEXT)
        {
            _CONTEXT = CONTEXT;
        }

    }
}