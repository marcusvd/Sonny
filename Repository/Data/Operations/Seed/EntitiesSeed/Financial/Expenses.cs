using Domain.Entities.Finances;
using Domain.Entities.Finances.CategorySubcategoryExpenses;

namespace Repository.Data.Operations.Seed.EntitiesSeed.Financial
{
    public class Expenses
    {
        public CategoryExpense HomeExpenses()
        {
            var home = new CategoryExpense();
            home.CompanyId = 1;
            home.Name = "Moradia";
            home.Id = 1;

            home.SubcategoriesExpenses = new();

            home.SubcategoriesExpenses.Add(new SubcategoryExpense()
            {
                Id = 1,
                Name = "INTERNET"
            });

            home.SubcategoriesExpenses.Add(new SubcategoryExpense()
            {
                Id = 2,
                Name = "Luz"
            });

            home.SubcategoriesExpenses.Add(new SubcategoryExpense()
            {
                Id = 3,
                Name = "Água"
            });

            return home;
        }
        public CategoryExpense WorkExpenses()
        {
            var work = new CategoryExpense();
            work.CompanyId = 1;
            work.Name = "Trabalho";
            work.Id = 2;
            work.SubcategoriesExpenses = new();
            work.SubcategoriesExpenses.Add(new SubcategoryExpense()
            {
                Id = 4,
                Name = "Impostos"
            });

            return work;
        }
    }
}