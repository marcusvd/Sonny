using System;
using System.Collections.Generic;
using System.Linq;
using Application.Exceptions;
using Application.Services.Operations.Finances.Dtos.Bank;
using Application.Services.Operations.Finances.Dtos.CreditCardExpenses;
using Application.Services.Operations.Finances.Dtos.FinancingsLoansExpenses;
using Application.Services.Operations.Finances.Dtos.InheritanceDto;
using Application.Services.Operations.Finances.Dtos.MonthlyExpenses;
using Application.Services.Operations.Finances.Dtos.PixExpenses;
using Domain.Entities.Finances.CreditCardExpenses;
using Domain.Entities.Finances.FinancingsLoansExpenses;
using Domain.Entities.Finances.Inheritance;
using Domain.Entities.Finances.MonthlyExpenses;
using Domain.Entities.Finances.PixExpenses;
using Domain.Entities.Finances.VariablesDebitsExpenses;
using Domain.Entities.Finances.YearlyExpenses;

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

        public FinancingAndLoanExpense FinancingLoansExpensesListMake(FinancingAndLoanExpense financingAndLoanExpense)
        {
            var financingLoanExpense = financingAndLoanExpense;

            financingLoanExpense.FinancingsAndLoansExpensesInstallments = new();

            financingLoanExpense.End = financingLoanExpense.Start.AddMonths(financingLoanExpense.InstallmentsQuantity);

            int currentMonth = 0;

            for (int n = 0; n < financingLoanExpense.InstallmentsQuantity; n++)
            {
                currentMonth++;

                financingLoanExpense.FinancingsAndLoansExpensesInstallments.Add(MakeFinancingLoansInstallmentsObj(financingLoanExpense, currentMonth));
            }

            return financingLoanExpense;
        }
        private FinancingAndLoanExpenseInstallment MakeFinancingLoansInstallmentsObj(FinancingAndLoanExpense financingAndLoanExpense, int currentMonth)
        {

            var financingLoanExpense = new FinancingAndLoanExpenseInstallment()
            {
                Id = 0,
                UserId = financingAndLoanExpense.UserId,
                CompanyId = financingAndLoanExpense.CompanyId,
                BankAccountId = null,
                CardId = null,
                PixId = null,
                OthersPaymentMethods = null,
                WasPaid = MinDate,
                Document = null,
                CurrentInstallment = $"{currentMonth}/{financingAndLoanExpense.InstallmentsQuantity}",
                Expires = financingAndLoanExpense.Start.AddMonths(--currentMonth),
                Registered = CurrentDate,
                Interest = 0,
                PriceWasPaidInstallment = 0,
            };

            return financingLoanExpense;
        }

        // public FinancingAndLoanExpenseInstallment FinancingPaidOff(FinancingAndLoanExpenseInstallment installments)
        // {
           
        //     var result = fromDb.FinancingsAndLoansExpensesInstallments.ToList().Where(x => x.WasPaid == DateTime.MinValue).ToList();

        //     if (result.Count == 1)
        //     {
        //         fromDb.WasPaid = DateTime.Now;
        //         fromDb.FinancingsAndLoansExpensesInstallments = null;
        //         return fromDb;
        //     }

        //     return null;
        // }
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
        public PixExpense CheckSourcePix(object entity, int id, string paymentExpense, PixExpenseDto PixExpense)
        {
            var result = MakePixExpense(entity, PixExpense);


            if (paymentExpense == "monthly")
                result.MonthlyFixedExpenseId = id;

            if (paymentExpense == "yearly")
                result.YearlyFixedExpenseId = id;

            if (paymentExpense == "financingloans")
                result.FinancingAndLoanExpenseId = id;

            if (paymentExpense == "variable")
                result.VariableExpenseId = id;

            return result;
        }
        private PixExpense MakePixExpense(object entity, PixExpenseDto PixExpense)
        {
            if (entity is MonthlyFixedExpense)
            {
                MonthlyFixedExpense monthlyFixedExpense = (MonthlyFixedExpense)entity;
                var pixExpense = new PixExpense()
                {
                    CompanyId = monthlyFixedExpense.CompanyId,
                    UserId = monthlyFixedExpense.CompanyId,
                    PixOutId = monthlyFixedExpense.PixId ?? 0,
                    BenefitedName = PixExpense.BenefitedName ?? monthlyFixedExpense.Name,
                    BenefitedKey = PixExpense.BenefitedKey ?? "Não cadastrado",
                    Price = monthlyFixedExpense.Price + monthlyFixedExpense.Interest,
                    ExpenseDay = PixExpense.ExpenseDay,
                    Registered = DateTime.Now,
                    Description = monthlyFixedExpense.Description

                };
                return pixExpense;
            }
            if (entity is YearlyFixedExpense)
            {
                YearlyFixedExpense yearlyFixedExpense = (YearlyFixedExpense)entity;
                var pixExpense = new PixExpense()
                {
                    CompanyId = yearlyFixedExpense.CompanyId,
                    UserId = yearlyFixedExpense.CompanyId,
                    PixOutId = yearlyFixedExpense.PixId ?? 0,
                    BenefitedName = PixExpense.BenefitedName ?? yearlyFixedExpense.Name,
                    BenefitedKey = PixExpense.BenefitedKey ?? "Não cadastrado",
                    Price = yearlyFixedExpense.Price + yearlyFixedExpense.Interest,
                    ExpenseDay = PixExpense.ExpenseDay,
                    Registered = DateTime.Now,
                    Description = yearlyFixedExpense.Description

                };
                return pixExpense;
            }
            if (entity is FinancingAndLoanExpenseInstallment)
            {
                FinancingAndLoanExpenseInstallment financingAndLoanExpenseInstallment = (FinancingAndLoanExpenseInstallment)entity;
                var pixExpense = new PixExpense()
                {
                    CompanyId = financingAndLoanExpenseInstallment.CompanyId,
                    UserId = financingAndLoanExpenseInstallment.CompanyId,
                    PixOutId = financingAndLoanExpenseInstallment.PixId ?? 0,
                    BenefitedName = PixExpense.BenefitedName ?? financingAndLoanExpenseInstallment.FinancingAndLoanExpense.Name,
                    BenefitedKey = PixExpense.BenefitedKey ?? "Não cadastrado",
                    Price = financingAndLoanExpenseInstallment.PriceWasPaidInstallment + financingAndLoanExpenseInstallment.Interest,
                    ExpenseDay = PixExpense.ExpenseDay,
                    Registered = DateTime.Now,
                    Description = financingAndLoanExpenseInstallment.FinancingAndLoanExpense.Description

                };
                return pixExpense;
            }
            if (entity is VariableExpense)
            {
                VariableExpense variableExpense = (VariableExpense)entity;
                var pixExpense = new PixExpense()
                {
                    CompanyId = variableExpense.CompanyId,
                    UserId = variableExpense.CompanyId,
                    PixOutId = variableExpense.PixId ?? 0,
                    BenefitedName = PixExpense.BenefitedName ?? variableExpense.Name,
                    BenefitedKey = PixExpense.BenefitedKey ?? "Não cadastrado",
                    Price = variableExpense.Price + variableExpense.Interest,
                    ExpenseDay = PixExpense.ExpenseDay,
                    Registered = DateTime.Now,
                    Description = variableExpense.Description
                };
                return pixExpense;
            }

            return null;
        }

    }
}
