using System;
using System.Collections.Generic;
using System.Linq;
using Application.Exceptions;
using Application.Services.Operations.Finances.Dtos.Bank;
using Application.Services.Operations.Finances.Dtos.CreditCardExpenses;
using Application.Services.Operations.Finances.Dtos.FinancingsLoansExpenses;
using Application.Services.Operations.Finances.Dtos.MonthlyExpenses;
using Domain.Entities.Finances.CreditCardExpenses;

namespace Application.Services.Operations.Finances.CommonForServices
{
    public abstract class InheritanceForFinancialServices
    {
        public DateTime CurrentDate = DateTime.Now;
        public DateTime MinDate = DateTime.MinValue;

        public List<CreditCardExpenseInvoiceDto> CreditCardInvoicesListMake(CardDto creditCard)
        {

            // if (creditCard == null) throw new Exception(GlobalErrorsMessagesException.ObjIsNull);
            // var invoicesList = new List<CreditCardExpenseInvoiceDto>();

            // for (int n = 1; n < 13; n++)
            // {
            //     var expires = new DateTime(CurrentDate.Year, n, creditCard.ExpiresDate.Day);
            //     var closingDate = new DateTime(CurrentDate.Year, n, creditCard.ClosingDate.Day);

            //     var creditCardInvoice = new CreditCardExpenseInvoiceDto()
            //     {
            //         UserId = creditCard.UserId,
            //         CompanyId = creditCard.CompanyId,
            //         CardId = creditCard.Id,
            //         Price = 0,
            //         Interest = 0,
            //         Expires = expires,
            //         ClosingDate = closingDate,
            //         WasPaid = MinDate,
            //         OthersPaymentMethods = null,
            //         Document = null,
            //         Description = creditCard.Description,
            //         Registered = creditCard.Registered,
            //         Deleted = creditCard.Deleted,
            //     };
            //     invoicesList.Add(creditCardInvoice);
            // }

            // return invoicesList;
            return null;

        }
        public List<FinancingAndLoanExpenseDto> FinancingLoansExpensesListMake(FinancingAndLoanExpenseDto financingAndLoanExpense)
        {
            var financingsAndLoansExpenses = new List<FinancingAndLoanExpenseDto>();

            FinancingAndLoanExpenseDto financingLoanExpense;

            string InstallmentId = Guid.NewGuid().ToString();

            int totalMonths = (financingAndLoanExpense.End.Year - financingAndLoanExpense.Start.Year) * 12 + financingAndLoanExpense.End.Month - financingAndLoanExpense.Start.Month;

            if (totalMonths != financingAndLoanExpense.InstallmentNumber)
                financingAndLoanExpense.InstallmentNumber = totalMonths;

            int currentMonth = 0;

            for (DateTime begin = financingAndLoanExpense.Start; begin <= financingAndLoanExpense.End; begin = begin.AddMonths(1))
            {

                currentMonth++;

                financingLoanExpense = new FinancingAndLoanExpenseDto()
                {
                    Id = financingAndLoanExpense.Id,
                    Name = financingAndLoanExpense.Name,
                    CategoryExpenseId = financingAndLoanExpense.CategoryExpenseId,
                    SubcategoryExpenseId = financingAndLoanExpense.SubcategoryExpenseId,
                    Start = financingAndLoanExpense.Start,
                    End = financingAndLoanExpense.End,
                    InstallmentId = InstallmentId,
                    InstallmentNumber = financingAndLoanExpense.InstallmentNumber,
                    CurrentInstallment = $"{currentMonth}/{financingAndLoanExpense.InstallmentNumber}",
                    CompanyId = financingAndLoanExpense.CompanyId,
                    UserId = financingAndLoanExpense.UserId,
                    BankAccountId = financingAndLoanExpense.BankAccountId,
                    CardId = null,
                    PixId = null,
                    OthersPaymentMethods = null,
                    WasPaid = MinDate,
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
   
        // public List<CreditCardExpenseDto> CreditCardExpensesInstallmentAssociateWithInvoice(List<CreditCardExpenseInvoice> listFromDb, List<CreditCardExpenseDto> listDto)
        // {

        //     if (listFromDb == null || listDto == null) throw new Exception(GlobalErrorsMessagesException.ObjIsNull);

        //    listDto.ForEach(x =>
        //     {
        //         listFromDb.ForEach(fdb =>
        //         {
        //             var predicate = new DateTime(x.Expires.Year, x.Expires.Month, x.Expires.Day) == new DateTime(fdb.Expires.Year, fdb.Expires.Month, fdb.Expires.Day);

        //             if (predicate)
        //             {
        //                 x.CreditCardExpenseInvoiceId = fdb.Id;
        //                 fdb.Price += x.InstallmentPrice;
        //             }

        //         });
        //     });
        //     return listDto;

        // }


    }
}
