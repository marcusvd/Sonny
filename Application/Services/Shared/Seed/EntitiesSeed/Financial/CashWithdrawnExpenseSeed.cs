using System;
using System.Collections.Generic;

using Domain.Entities.Finances.VariablesDebitsExpenses;

namespace Application.Services.Shared.Seed.EntitiesSeed.Financial
{
    public class CashWithdrawnExpensesSeed
    {
        private CashWithdrawnExpense Variable01()
        {
            var Var01 = new CashWithdrawnExpense()
            {
                Id = 0,
                Name = "Passeio, mocinha.",
                CompanyId = 1,
                UserId = 1,
                BankAccountId = 1,
                WithdrawnOn = DateTime.Now,
                Registered = DateTime.Now,
                Price = 8,
                Deleted = DateTime.MinValue,
                CategoryExpenseId = 7,
                SubcategoryExpenseId = 34,
                Place = "Andradas, pista de cooper",
                Description = "Água de coco"

            };
            return Var01;
        }
        private CashWithdrawnExpense Variable02()
        {
            var Var02 = new CashWithdrawnExpense()
            {
                Id = 0,
                Name = "Media digital jogo",
                CompanyId = 1,
                UserId = 1,
                BankAccountId = 2,
                WithdrawnOn = DateTime.Now,
                Registered = DateTime.Now,
                Price = 8,
                Deleted = DateTime.MinValue,
                CategoryExpenseId = 3,
                SubcategoryExpenseId = 11,
                Place = "Grupo Ragnar no WhatsApp",
                Description = "Jogo Virtual para play4 Resident Evil"
            };
            return Var02;
        }
        public List<CashWithdrawnExpense> AddCashWithdrawnExpensesAsync()
        {
            var Yearly = new List<CashWithdrawnExpense>{
                   Variable01(),
                   Variable02()
            };
            return Yearly;
        }

    }
}