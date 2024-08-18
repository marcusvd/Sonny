using System.Collections.Generic;
using Domain.Entities.Finances;
using Domain.Entities.Finances.CategorySubcategoryExpenses;

namespace Application.Services.Shared.Seed.EntitiesSeed.Financial
{
    public class FinancialCategoriesExpensesSeed
    {
        private CategoryExpense HomeExpenses()
        {
            var home = new CategoryExpense();
            home.CompanyId = 1;
            home.Name = "Moradia";
            home.Id = 1;

            home.SubcategoriesExpenses = new(){
                new SubcategoryExpense()
            {
                Id = 1,
                Name = "INTERNET"
            },
                new SubcategoryExpense()
            {
                Id = 2,
                Name = "Luz"
            },
                new SubcategoryExpense()
            {
                Id = 3,
                Name = "Água"
            }
            };
            return home;
        }
        private CategoryExpense WorkExpenses()
        {
            var work = new CategoryExpense();
            work.CompanyId = 1;
            work.Name = "Trabalho";
            work.Id = 2;
            work.SubcategoriesExpenses = new() {
                new SubcategoryExpense()
            {
                Id = 4,
                Name = "Impostos"
            },
                new SubcategoryExpense()
            {
                Id = 5,
                Name = "DDNS Provider"
            },
                new SubcategoryExpense()
            {
                Id = 6,
                Name = "Provedor Domínio / Hospedagem / Email"
            },
                new SubcategoryExpense()
            {
                Id = 7,
                Name = "INTERNET"
            },
                new SubcategoryExpense()
            {
                Id = 8,
                Name = "Luz"
            },
                new SubcategoryExpense()
            {
                Id = 9,
                Name = "Água"
            },
            };

            return work;
        }


        public List<CategoryExpense> categoryExpensesToDb()
        {
            var toReturn = new List<CategoryExpense>(){
                HomeExpenses(), WorkExpenses()
            };
            return toReturn;
        }

    }
}