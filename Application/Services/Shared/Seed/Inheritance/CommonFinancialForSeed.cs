using System;
using System.Collections.Generic;
using Domain.Entities.Finances.MonthlyExpenses;
namespace Application.Services.Shared.Seed.EntitiesSeed.Inheritance
{
    public abstract class CommonFinancialForSeed
    {
        public DateTime CurrentDate = DateTime.Now;
        public DateTime MinDate = DateTime.MinValue;
        public List<MonthlyFixedExpense> MonthlyFixedExpensesListMake(MonthlyFixedExpense monthlyFixedExpense)
        {
            var monthlyExpenses = new List<MonthlyFixedExpense>();

            MonthlyFixedExpense monthlyExpense;
            DateTime expirationDate;

            for (int n = CurrentDate.Month; n <= 12; n++)
            {
                expirationDate = new DateTime(CurrentDate.Year, n, monthlyFixedExpense.Expires.Day);

                monthlyExpense = new MonthlyFixedExpense()
                {
                    Id = monthlyFixedExpense.Id,
                    Name = monthlyFixedExpense.Name,
                    CompanyId = monthlyFixedExpense.CompanyId,
                    UserId = monthlyFixedExpense.UserId,
                    BankAccountId = null,
                    PixId = null,
                    CardId = null,
                    OthersPaymentMethods = null,
                    WasPaid = DateTime.MinValue,
                    Expires = expirationDate,
                    Registered = DateTime.Now,
                    Price = monthlyFixedExpense.Price,
                    Interest = monthlyFixedExpense.Interest,
                    CategoryExpenseId = monthlyFixedExpense.CategoryExpenseId,
                    SubcategoryExpenseId = monthlyFixedExpense.SubcategoryExpenseId,
                    LinkCopyBill = monthlyFixedExpense.LinkCopyBill,
                    USERLinkCopyBill = monthlyFixedExpense.USERLinkCopyBill,
                    PASSLinkCopyBill = monthlyFixedExpense.PASSLinkCopyBill


                };
                monthlyExpenses.Add(monthlyExpense);
            }

            return monthlyExpenses;
        }

    }
}