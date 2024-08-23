using System;
using System.Collections.Generic;
using Domain.Entities.Finances.FinancingsLoansExpenses;
using Domain.Entities.Finances.MonthlyExpenses;
using Domain.Entities.Finances.YearlyExpenses;

namespace Application.Services.Shared.Seed.EntitiesSeed.Inheritance
{
    public abstract class CommonFinancialForSeed
    {


        public DateTime CurrentDate = DateTime.Now;
        public DateTime MinDate = DateTime.MinValue;       
        // public List<FinancingAndLoanExpenseTracking> FinancingLoansExpensesTrackings(FinancingAndLoanExpense financingAndLoanExpense)
        // {
        //     var tranckings = new List<FinancingAndLoanExpenseTracking>();

        //     FinancingAndLoanExpenseTracking trancking;

        //     for (DateTime begin = financingAndLoanExpense.Start; begin <= financingAndLoanExpense.End; begin = begin.AddMonths(1))
        //     {
        //         trancking = new FinancingAndLoanExpenseTracking()
        //         {
        //             Start = financingAndLoanExpense.Start,
        //             End = financingAndLoanExpense.End,
        //             InstallmentNumber = financingAndLoanExpense.InstallmentNumber,
        //             CompanyId = financingAndLoanExpense.CompanyId,
        //             UserId = financingAndLoanExpense.UserId,
        //             BankAccountId = null,
        //             CardId = null,
        //             PixId = null,
        //             OthersPaymentMethods = null,
        //             WasPaid = MinDate,
        //             Expires = begin,
        //             Registered = CurrentDate,
        //             Price = financingAndLoanExpense.Price,
        //             Interest = 0,
        //             Deleted = false,
        //         };
        //         tranckings.Add(trancking);
        //     }
        //     return tranckings;
        // }
         public List<MonthlyFixedExpense> MonthlyFixedExpenses(MonthlyFixedExpense monthlyFixedExpense)
         {

             var tranckings = new List<MonthlyFixedExpense>();

             MonthlyFixedExpense trancking;
             DateTime expirationDate;

             for (int n = CurrentDate.Month; n <= 12; n++)
             {
                 trancking = new MonthlyFixedExpense();
                 expirationDate = new DateTime(CurrentDate.Year, n, monthlyFixedExpense.Expires.Day);
                 trancking.CompanyId = monthlyFixedExpense.CompanyId;
                 //trancking.UserId = null;
                 trancking.UserId = 1;
                 trancking.BankAccountId = null;
                 trancking.PixId = null;
                 trancking.CardId = null;
                 trancking.OthersPaymentMethods = null;
                 trancking.WasPaid = DateTime.MinValue;
                 trancking.Expires = expirationDate;
                 trancking.Registered = DateTime.Now;
                 trancking.Price = monthlyFixedExpense.Price;
                 trancking.Interest = 0;
                 tranckings.Add(trancking);
             }

             return tranckings;

         }
        // public List<YearlyFixedExpenseTracking> YearlyTrackings(YearlyFixedExpense yearlyFixedExpense)
        // {

        //     var tranckings = new List<YearlyFixedExpenseTracking>(){
        //         new YearlyFixedExpenseTracking()
        //         {
        //             CompanyId = yearlyFixedExpense.CompanyId,
        //             UserId = yearlyFixedExpense.UserId,
        //             BankAccountId = null,
        //             PixId = null,
        //             CardId = null,
        //             OthersPaymentMethods = null,
        //             WasPaid = DateTime.MinValue,
        //             Start = yearlyFixedExpense.Start,
        //             Expires = yearlyFixedExpense.Expires,
        //             Registered = DateTime.Now,
        //             Price = yearlyFixedExpense.Price,
        //             Interest = 0,
        //             Deleted = false,
        //         }
        //     };
            
        //     return tranckings;
        // }
    



    }
}