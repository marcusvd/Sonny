using System;
using System.Collections.Generic;
using Domain.Entities.Finances.VariablesDebitsExpenses;

namespace Application.Services.Shared.Seed.EntitiesSeed.Financial
{
    public class VariableExpensesSeed
    {
        private VariableExpense Variable01()
        {
            var Var01 = new VariableExpense()
            {
                Id = 0,
                Name = "Passeio, mocinha.",
                CompanyId = 1,
                UserId = 1,
                BankAccountId = 1,
                CardId = null,
                PixId = 1,
                OthersPaymentMethods = null,
                WasPaid = DateTime.Now,
                Expires = DateTime.Now,
                Registered = DateTime.Now,
                Price = 8,
                Interest = 0,
                Deleted = false,
                CategoryExpenseId = 3,
                SubcategoryExpenseId = 10,
                Item = "Água de coco",
                Place = "Andradas, pista de cooper",
                LinkCopyBill = null,
                USERLinkCopyBill = null,
                PASSLinkCopyBill = null,
                Description = ""

            };
            return Var01;
        }
        private VariableExpense Variable02()
        {
            var Var02 = new VariableExpense()
            {
                Id = 0,
                Name = "Media digital jogo",
                CompanyId = 1,
                UserId = 1,
                BankAccountId = 2,
                CardId = 3,
                PixId = 1,
                OthersPaymentMethods = null,
                WasPaid = DateTime.Now,
                Expires = DateTime.Now,
                Registered = DateTime.Now,
                Price = 8,
                Interest = 0,
                Deleted = false,
                CategoryExpenseId = 3,
                SubcategoryExpenseId = 11,
                Item = "Jogo Virtual para play4 Resident Evil",
                Place = "Grupo Ragnar no WhatsApp",
                LinkCopyBill = null,
                USERLinkCopyBill = null,
                PASSLinkCopyBill = null,
                Description = ""
            };
            return Var02;
        }
        public List<VariableExpense> AddVariableExpensesAsync()
        {
            var Yearly = new List<VariableExpense>{
                   Variable01(),
                   Variable02()
            };
            return Yearly;
        }

    }
}