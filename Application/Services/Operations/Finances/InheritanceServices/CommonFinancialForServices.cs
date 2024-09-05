using System;
using System.Collections.Generic;
using Application.Services.Operations.Finances.Dtos;
using Application.Services.Operations.Finances.Dtos.CreditCardExpenses;
using Application.Services.Operations.Finances.Dtos.FinancingsLoansExpenses;
using Application.Services.Operations.Finances.Dtos.MonthlyExpenses;
using Domain.Entities.Finances.FinancingsLoansExpenses;

namespace Application.Services.Operations.Finances.InheritanceServices
{
    public abstract class CommonFinancialForServices
    {
        public DateTime CurrentDate = DateTime.Now;
        public DateTime MinDate = DateTime.MinValue;

        public List<FinancingAndLoanExpenseDto> FinancingLoansExpenses(FinancingAndLoanExpenseDto financingAndLoanExpense)
        {
            var financingsAndLoansExpenses = new List<FinancingAndLoanExpenseDto>();

            FinancingAndLoanExpenseDto financingLoanExpense;

            for (DateTime begin = financingAndLoanExpense.Start; begin <= financingAndLoanExpense.End; begin = begin.AddMonths(1))
            {
                financingLoanExpense = new FinancingAndLoanExpenseDto()
                {
                    Id = financingAndLoanExpense.Id,
                    Name = financingAndLoanExpense.Name,
                    CategoryExpenseId = financingAndLoanExpense.CategoryExpenseId,
                    SubcategoryExpenseId = financingAndLoanExpense.SubcategoryExpenseId,
                    Start = financingAndLoanExpense.Start,
                    End = financingAndLoanExpense.End,
                    CompanyId = financingAndLoanExpense.CompanyId,
                    UserId = financingAndLoanExpense.UserId,
                    BankAccountId = financingAndLoanExpense.BankAccountId,
                    CardId = financingAndLoanExpense.CardId,
                    PixId = financingAndLoanExpense.PixId,
                    OthersPaymentMethods = financingAndLoanExpense.OthersPaymentMethods,
                    WasPaid = financingAndLoanExpense.WasPaid,
                    Document = financingAndLoanExpense.Document,
                    Expires = begin,
                    Registered = CurrentDate,
                    Price = financingAndLoanExpense.Price,
                    Interest = financingAndLoanExpense.Interest,
                    LinkCopyBill = financingAndLoanExpense.LinkCopyBill,
                    USERLinkCopyBill = financingAndLoanExpense.USERLinkCopyBill,
                    PASSLinkCopyBill = financingAndLoanExpense.PASSLinkCopyBill,
                    Deleted = financingAndLoanExpense.Deleted,
                    Description = financingAndLoanExpense.Description,
                };
                financingsAndLoansExpenses.Add(financingLoanExpense);
            }
            return financingsAndLoansExpenses;
        }
        public List<MonthlyFixedExpenseDto> MonthlyFixedExpensesListMake(MonthlyFixedExpenseDto monthlyFixedExpense)
        {
            var monthlyExpenses = new List<MonthlyFixedExpenseDto>();

            MonthlyFixedExpenseDto monthlyExpense;
            DateTime expirationDate;

            for (int n = CurrentDate.Month; n <= 12; n++)
            {
                expirationDate = new DateTime(CurrentDate.Year, n, monthlyFixedExpense.Expires.Day);

                monthlyExpense = new MonthlyFixedExpenseDto()
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
        public List<CreditCardExpenseDto> CreditCardExpensesListMake(CreditCardExpenseDto creditCardExpenseEntity)
        {
            var creditCardExpenses = new List<CreditCardExpenseDto>();

            CreditCardExpenseDto creditCardExpense;

            if (creditCardExpenseEntity.InstallmentNumber > 1)
            {
                for (int n = 0; n < creditCardExpenseEntity.InstallmentNumber; n++)
                {
                    creditCardExpense = new CreditCardExpenseDto()
                    {
                        Id = creditCardExpenseEntity.Id,
                        Name = creditCardExpenseEntity.Name,
                        CategoryExpenseId = creditCardExpenseEntity.CategoryExpenseId,
                        SubcategoryExpenseId = creditCardExpenseEntity.SubcategoryExpenseId,
                        CompanyId = creditCardExpenseEntity.CompanyId,
                        UserId = creditCardExpenseEntity.UserId,
                        BankAccountId = creditCardExpenseEntity.BankAccountId,
                        CardId = creditCardExpenseEntity.CardId,
                        PixId = null,
                        OthersPaymentMethods = null,
                        WasPaid = DateTime.MinValue,
                        Document = creditCardExpenseEntity.Document,
                        Expires = creditCardExpenseEntity.Expires.AddMonths(n),
                        InstallmentNumber = creditCardExpenseEntity.InstallmentNumber,
                        ExpenseDay = creditCardExpenseEntity.ExpenseDay,
                        Registered = CurrentDate,
                        Price = creditCardExpenseEntity.Price,
                        Interest = creditCardExpenseEntity.Interest,
                        Deleted = creditCardExpenseEntity.Deleted,
                        Description = creditCardExpenseEntity.Description,
                    };

                    creditCardExpenses.Add(creditCardExpense);
                }
            }
            return creditCardExpenses;
        }

    }
}