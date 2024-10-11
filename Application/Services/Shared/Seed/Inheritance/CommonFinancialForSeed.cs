using System;
using System.Collections.Generic;
using Application.Exceptions;
using Application.Services.Operations.Finances.Dtos.Bank;
using Application.Services.Operations.Finances.Dtos.CreditCardExpenses;
using Domain.Entities.Finances.Bank;
using Domain.Entities.Finances.CreditCardExpenses;
using Domain.Entities.Finances.Enums;
using Domain.Entities.Finances.FinancingsLoansExpenses;
using Domain.Entities.Finances.MonthlyExpenses;
using Domain.Entities.Finances.YearlyExpenses;

namespace Application.Services.Shared.Seed.EntitiesSeed.Inheritance
{
    public abstract class CommonFinancialForSeed
    {
        public DateTime CurrentDate = DateTime.Now;
        public DateTime MinDate = DateTime.MinValue;
        // public List<FinancingAndLoanExpense> FinancingLoansExpenses(FinancingAndLoanExpense financingAndLoanExpense)
        // {
        //     var financingsAndLoansExpenses = new List<FinancingAndLoanExpense>();

        //     FinancingAndLoanExpense financingLoanExpense;

        //     string InstallmentId = Guid.NewGuid().ToString();
         
        //     int totalMonths = (financingAndLoanExpense.End.Year - financingAndLoanExpense.Start.Year) * 12 + financingAndLoanExpense.End.Month - financingAndLoanExpense.Start.Month;

        //     if (totalMonths != financingAndLoanExpense.InstallmentsQuantity)
        //         financingAndLoanExpense.InstallmentsQuantity = totalMonths;

        //     int currentMonth = 0;

        //     for (DateTime begin = financingAndLoanExpense.Start; begin <= financingAndLoanExpense.End; begin = begin.AddMonths(1))
        //     {

        //         currentMonth++;
        //         financingLoanExpense = new FinancingAndLoanExpense()
        //         {
        //             Id = financingAndLoanExpense.Id,
        //             Name = financingAndLoanExpense.Name,
        //             CategoryExpenseId = financingAndLoanExpense.CategoryExpenseId,
        //             SubcategoryExpenseId = financingAndLoanExpense.SubcategoryExpenseId,
        //             Start = financingAndLoanExpense.Start,
        //             End = financingAndLoanExpense.End,
        //             InstallmentId = InstallmentId,
        //             InstallmentsQuantity = financingAndLoanExpense.InstallmentsQuantity,
        //             CurrentInstallment = $"{currentMonth}/{financingAndLoanExpense.InstallmentsQuantity}",
        //             CompanyId = financingAndLoanExpense.CompanyId,
        //             UserId = financingAndLoanExpense.UserId,
        //             BankAccountId = financingAndLoanExpense.BankAccountId,
        //             CardId = financingAndLoanExpense.CardId,
        //             PixId = financingAndLoanExpense.PixId,
        //             OthersPaymentMethods = financingAndLoanExpense.OthersPaymentMethods,
        //             WasPaid = financingAndLoanExpense.WasPaid,
        //             Document = financingAndLoanExpense.Document,
        //             Expires = begin,
        //             Registered = CurrentDate,
        //             Price = financingAndLoanExpense.Price,
        //             Interest = financingAndLoanExpense.Interest,
        //             LinkCopyBill = financingAndLoanExpense.LinkCopyBill,
        //             USERLinkCopyBill = financingAndLoanExpense.USERLinkCopyBill,
        //             PASSLinkCopyBill = financingAndLoanExpense.PASSLinkCopyBill,
        //             Deleted = financingAndLoanExpense.Deleted,
        //             Description = financingAndLoanExpense.Description,
        //         };
        //         financingsAndLoansExpenses.Add(financingLoanExpense);
        //     }
        //     return financingsAndLoansExpenses;
        // }
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
        public List<CreditCardExpenseInvoice> CreditCardInvoicesListMake(Card creditCard)
        {

            if (creditCard == null) throw new Exception(GlobalErrorsMessagesException.ObjIsNull);

            var invoicesList = new List<CreditCardExpenseInvoice>();

            for (int n = 1; n < 13; n++)
            {
                var expires = new DateTime(CurrentDate.Year, n, creditCard.ExpiresDate.Day);
                var closingDate = new DateTime(CurrentDate.Year, n, creditCard.ClosingDate.Day);

                var creditCardInvoice = new CreditCardExpenseInvoice()
                {
                    UserId = creditCard.UserId,
                    CompanyId = creditCard.CompanyId,
                    CardId = creditCard.Id,
                    Price = 0,
                    Interest = 0,
                    Expires = expires,
                    ClosingDate = closingDate,
                    WasPaid = MinDate,
                    OthersPaymentMethods = null,
                    Document = null,
                    Description = creditCard.Description,
                    Registered = creditCard.Registered,
                    Deleted = creditCard.Deleted,
                };
                invoicesList.Add(creditCardInvoice);
            }

            return invoicesList;

        }


    }
}