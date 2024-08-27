using System;
using Application.Services.Shared.Seed.EntitiesSeed.Inheritance;
using Domain.Entities.Finances.FinancingsLoansExpenses;

namespace Application.Services.Shared.Seed.EntitiesSeed.Financial
{
    public class FinancingsAndLoansExpensesSeed : CommonFinancialForSeed
    {
        public FinancingAndLoanExpense FinancingAndLoan01()
        {
            var Financing = new FinancingAndLoanExpense()
            {
                Id = 0,
                Name = "Fiesta preto",
                CompanyId = 1,
                UserId = 1,
                CategoryExpenseId = 4,
                SubcategoryExpenseId = 13,
                BankAccountId = null,
                CardId = null,
                PixId = null,
                OthersPaymentMethods = null,
                WasPaid = MinDate,
                Documento = null,
                Expires = new DateTime(2026, 03, 25),
                Start = new DateTime(2024, 03, 11),
                End = new DateTime(2026, 03, 11),
                Registered = CurrentDate,
                Price = 583,
                Interest = 0,
                LinkCopyBill = null,
                USERLinkCopyBill = null,
                PASSLinkCopyBill = null,
                Deleted = false,
                Description = "Financiamento ford fiesta 2009",
            };


            return Financing;
        }

    }
}