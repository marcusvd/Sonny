using System.Collections.Generic;
using Domain.Entities.Finances.CategorySubcategoryExpenses;

namespace Application.Services.Shared.Seed.EntitiesSeed.Financial
{
    public class CategoriesExpensesSeed
    {
        private CategoryExpense HomeExpenses()
        {
            var home = new CategoryExpense()
            {
                Id = 1,
                CompanyId = 1,
                Name = "Moradia",
                SubcategoriesExpenses = new(){
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
            }
            };

            return home;
        }
        private CategoryExpense WorkExpenses()
        {
            var work = new CategoryExpense()
            {
                CompanyId = 1,
                Name = "Trabalho",
                Id = 2,
                SubcategoriesExpenses = new() {
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
            }
            };
            return work;
        }
        private CategoryExpense LeisureExpenses()
        {
            var leisure = new CategoryExpense()
            {
                Id = 3,
                CompanyId = 1,
                Name = "Lazer",
                SubcategoriesExpenses = new(){
                new SubcategoryExpense()
            {
                Id = 10,
                Name = "Caminhada"
            },
                new SubcategoryExpense()
            {
                Id = 11,
                Name = "Video Game"
            },
                new SubcategoryExpense()
            {
                Id = 12,
                Name = "Filme"
            }
            }
            };

            return leisure;
        }
        private CategoryExpense FinancingsExpenses()
        {
            var leisure = new CategoryExpense()
            {
                Id = 4,
                CompanyId = 1,
                Name = "Financiamento",
                SubcategoriesExpenses = new(){
                new SubcategoryExpense()
            {
                Id = 13,
                Name = "Veiculo"
            },
                new SubcategoryExpense()
            {
                Id = 14,
                Name = "Moradia"
            }
            }
            };

            return leisure;
        }
        public List<CategoryExpense> CategoryExpensesToDb()
        {
            var toReturn = new List<CategoryExpense>(){
                HomeExpenses(), WorkExpenses(),LeisureExpenses(),FinancingsExpenses()
            };
            return toReturn;
        }

    }
}