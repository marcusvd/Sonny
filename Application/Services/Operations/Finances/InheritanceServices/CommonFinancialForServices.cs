using System;
using System.Collections.Generic;
using Application.Exceptions;
using Application.Services.Operations.Finances.Dtos.Bank;
using Application.Services.Operations.Finances.Dtos.CreditCardExpenses;
using Application.Services.Operations.Finances.Dtos.FinancingsLoansExpenses;
using Application.Services.Operations.Finances.Dtos.MonthlyExpenses;

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
                        CreditCardExpenseInvoiceId = creditCardExpenseEntity.CreditCardExpenseInvoiceId,
                        CreditCardLimitOperation = creditCardExpenseEntity.CreditCardLimitOperation,
                        PixId = null,
                        OthersPaymentMethods = null,
                        WasPaid = DateTime.MinValue,
                        Document = creditCardExpenseEntity.Document,
                        Expires = creditCardExpenseEntity.Expires.AddMonths(n),
                        InstallmentNumber = creditCardExpenseEntity.InstallmentNumber,
                        InstallmentPrice = creditCardExpenseEntity.InstallmentPrice,
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
            if (creditCardExpenseEntity.InstallmentNumber == 1)
                creditCardExpenses.Add(creditCardExpenseEntity);


            return creditCardExpenses;
        }
        public List<CreditCardExpenseInvoiceDto> CreditCardInvoicesListMake(CardDto creditCard)
        {

            if (creditCard == null) throw new Exception(GlobalErrorsMessagesException.ObjIsNull);
            var invoicesList = new List<CreditCardExpenseInvoiceDto>();

            for (int n = 1; n < 13; n++)
            {
                var expires = new DateTime(CurrentDate.Year, n, creditCard.ExpiresDate.Day);
                var closingDate = new DateTime(CurrentDate.Year, n, creditCard.ClosingDate.Day);

                var creditCardInvoice = new CreditCardExpenseInvoiceDto()
                {
                    UserId = creditCard.UserId,
                    CompanyId = creditCard.CompanyId,
                    CardId = creditCard.Id,
                    AmountPrice = 0,
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
