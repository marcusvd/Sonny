using System.Collections.Generic;
using Domain.Entities.Finances.CategorySubcategoryExpenses;
using Domain.Entities.Finances.Enums;

namespace Application.Services.Shared.Seed.EntitiesSeed.Financial
{
    public class CategoriesExpensesSeed
    {
        private CategoryExpense HomeExpenses()
        {
            var home = new CategoryExpense
            {
                Id = 1,
                CompanyId = 1,
                Name = "Moradia".ToUpper(),
                // PayCycle = PayCycleEnum.Month,
                SubcategoriesExpenses = new(){
                new SubcategoryExpense()
            {
                Id = 1,
                Name = "contas de consumo".ToUpper(),
                PayCycle = PayCycleEnum.Month
            },
                new SubcategoryExpense()
            {
                Id = 2,
                Name = "Reparos / Reforma".ToUpper(),
                PayCycle = PayCycleEnum.Variable
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
                // PayCycle = PayCycleEnum.Variable,
                SubcategoriesExpenses = new() {
                new SubcategoryExpense()
            {
                Id = 4,
                Name = "MEI",
                PayCycle = PayCycleEnum.Month
            },
                new SubcategoryExpense()
            {
                Id = 5,
                Name = "DDNS Provider",
                PayCycle = PayCycleEnum.Year
            },
                new SubcategoryExpense()
            {
                Id = 6,
                Name = "Provedor Domínio / Hospedagem / Email",
                PayCycle = PayCycleEnum.Year
            },
                new SubcategoryExpense()
            {
                Id = 7,
                Name = "contas de consumo".ToUpper(),
                PayCycle = PayCycleEnum.Month
            },
            }
            };
            return work;
        }
        private CategoryExpense LeisureExpenses()
        {
            var leisure = new CategoryExpense
            {
                Id = 3,
                CompanyId = 1,
                Name = "Lazer / Entretenimentos",
                // PayCycle = PayCycleEnum.Year,
                SubcategoriesExpenses = new() {
                new SubcategoryExpense()
            {
                Id = 11,
                Name = "Video Game",
                PayCycle = PayCycleEnum.Variable,
            },
                new SubcategoryExpense()
            {
                Id = 12,
                Name = "Filme (Cinema)",
                PayCycle = PayCycleEnum.Variable,
            },
                new SubcategoryExpense()
            {
                Id = 22,
                Name = "Stream (Netflix / Amazon)",
                PayCycle = PayCycleEnum.Month,
            },
                new SubcategoryExpense()
            {
                Id = 31,
                Name = "Bar",
                PayCycle = PayCycleEnum.Variable,
            }
            }
            };

            return leisure;
        }
        private CategoryExpense FinancingsExpenses00()
        {
            var Financing = new CategoryExpense
            {
                Id = 4,
                CompanyId = 1,
                Name = "Financiamento",
                // PayCycle = PayCycleEnum.FinancingLoans,
                SubcategoriesExpenses = new(){
                new SubcategoryExpense()
            {
                Id = 13,
                Name = "Veiculo",
                PayCycle = PayCycleEnum.FinancingLoans,
            },
                new SubcategoryExpense()
            {
                Id = 14,
                Name = "Moradia",
                PayCycle = PayCycleEnum.FinancingLoans,
            }
            }
            };

            return Financing;
        }
        private CategoryExpense FinancingsExpenses01()
        {
            var loans = new CategoryExpense
            {
                Id = 5,
                CompanyId = 1,
                Name = "Empréstimo",
                // PayCycle = PayCycleEnum.FinancingLoans,
                SubcategoriesExpenses = new(){
                new SubcategoryExpense()
            {
                Id = 15,
                Name = "Banco",
                PayCycle = PayCycleEnum.FinancingLoans
            },
                new SubcategoryExpense()
            {
                Id = 16,
                Name = "Pessoa Física",
                PayCycle = PayCycleEnum.FinancingLoans
            },
                new SubcategoryExpense()
            {
                Id = 17,
                Name = "Penhor",
                PayCycle = PayCycleEnum.FinancingLoans
            }
            }
            };

            return loans;
        }
        private CategoryExpense Transport()
        {
            var Transport = new CategoryExpense
            {
                Id = 6,
                CompanyId = 1,
                Name = "transporte".ToUpper(),
                // PayCycle = PayCycleEnum.FinancingLoans,
                SubcategoriesExpenses = new(){
                new SubcategoryExpense()
            {
                Id = 19,
                Name = "Combustível",
                PayCycle = PayCycleEnum.Variable,
            },
                new SubcategoryExpense()
            {
                Id = 20,
                Name = "Combustível",
                PayCycle = PayCycleEnum.Month,
            },
                new SubcategoryExpense()
            {
                Id = 10,
                Name = "App (Ubber / 99)",
                PayCycle = PayCycleEnum.Variable,
            },
                new SubcategoryExpense()
            {
                Id = 21,
                Name = "Público (ônibus /Metrô)",
                PayCycle = PayCycleEnum.Variable,
            },
                new SubcategoryExpense()
            {
                Id = 32,
                Name = "Mecânico",
                PayCycle = PayCycleEnum.Variable,
            }
            ,
                new SubcategoryExpense()
            {
                Id = 33,
                Name = "Peças",
                PayCycle = PayCycleEnum.Variable,
            }
            }
            };

            return Transport;
        }
        private CategoryExpense Food()
        {
            var home = new CategoryExpense
            {
                Id = 7,
                CompanyId = 1,
                Name = "Alimentação".ToUpper(),
                SubcategoriesExpenses = new(){

                new SubcategoryExpense()
            {
                Id = 18,
                Name = "super mercado".ToUpper(),
                PayCycle = PayCycleEnum.Variable
            },

                new SubcategoryExpense()
            {
                Id = 23,
                Name = "padaria".ToUpper(),
                PayCycle = PayCycleEnum.Variable
            },

                new SubcategoryExpense()
            {
                Id = 24,
                Name = "sorveteria /Açai".ToUpper(),
                PayCycle = PayCycleEnum.Variable
            },
                new SubcategoryExpense()
            {
                Id = 34,
                Name = "Água de Coco".ToUpper(),
                PayCycle = PayCycleEnum.Variable
            },
                new SubcategoryExpense()
            {
                Id = 25,
                Name = "lanchonete".ToUpper(),
                PayCycle = PayCycleEnum.Variable
            },

            }
            };

            return home;
        }
        private CategoryExpense Pet()
        {
            var pet = new CategoryExpense
            {
                Id = 8,
                CompanyId = 1,
                Name = "(Pet) Animal de estimação".ToUpper(),
                SubcategoriesExpenses = new(){

                new SubcategoryExpense()
            {
                Id = 27,
                Name = "Veterinário".ToUpper(),
                PayCycle = PayCycleEnum.Variable
            },

                new SubcategoryExpense()
            {
                Id = 28,
                Name = "Medicamento".ToUpper(),
                PayCycle = PayCycleEnum.Variable
            },

                new SubcategoryExpense()
            {
                Id = 29,
                Name = "Banho / tosa".ToUpper(),
                PayCycle = PayCycleEnum.Variable
            },
                new SubcategoryExpense()
            {
                Id = 30,
                Name = "Hotel (Pet)".ToUpper(),
                PayCycle = PayCycleEnum.Variable
            },

            }
            };

            return pet;
        }
        public List<CategoryExpense> CategoryExpensesToDb()
        {
            var toReturn = new List<CategoryExpense>(){
                HomeExpenses(),
                WorkExpenses(),
                LeisureExpenses(),
                FinancingsExpenses00(),
                FinancingsExpenses01(),
                Transport(),
                Food(),
                Pet()
            };
            return toReturn;
        }

    }
}