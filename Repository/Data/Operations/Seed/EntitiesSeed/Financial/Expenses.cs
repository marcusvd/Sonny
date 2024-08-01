using Domain.Entities.Finances;

namespace Repository.Data.Operations.Seed.EntitiesSeed.Financial
{
    public class Expenses
    {
        public CategoryExpenses HomeExpenses()
        {
            var home = new CategoryExpenses();
            home.CompanyId = 1;
            home.Name = "Moradia";
            home.Id = 1;

            home.SubcategoriesExpenses = new();

            home.SubcategoriesExpenses.Add(new SubcategoryExpenses()
            {
                Id = 1,
                Name = "INTERNET"
            });

            home.SubcategoriesExpenses.Add(new SubcategoryExpenses()
            {
                Id = 2,
                Name = "Luz"
            });

            home.SubcategoriesExpenses.Add(new SubcategoryExpenses()
            {
                Id = 3,
                Name = "Água"
            });

            return home;
        }
        public CategoryExpenses WorkExpenses()
        {
            var work = new CategoryExpenses();
            work.CompanyId = 1;
            work.Name = "Trabalho";
            work.Id = 2;
            work.SubcategoriesExpenses = new();
            work.SubcategoriesExpenses.Add(new SubcategoryExpenses()
            {
                Id = 4,
                Name = "Impostos"
            });

            return work;
        }
    }
}