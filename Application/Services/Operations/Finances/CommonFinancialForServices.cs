using System;
using System.Collections.Generic;
using Application.Services.Operations.Finances.Dtos;

namespace Application.Services.Operations.Finances
{
    public abstract class CommonFinancialForServices
    {
        public DateTime CurrentDate = DateTime.Now;
        public DateTime simulatedDateTest = new DateTime(2025, 07, 04);


        public List<MonthFixedExpensesTrackingDto> AddMonthFixedExpensesTracking(MonthFixedExpensesDto monthFixedExpenses)
        {


            var tranckings = new List<MonthFixedExpensesTrackingDto>();

            MonthFixedExpensesTrackingDto trancking;
            DateTime expirationDate;

            for (int n = CurrentDate.Month; n <= 12; n++)
            {
                trancking = new MonthFixedExpensesTrackingDto();
                trancking.Id = 0;
                expirationDate = new DateTime(CurrentDate.Year, n, monthFixedExpenses.Expiration.Day);
                trancking.CompanyId = monthFixedExpenses.CompanyId;
                trancking.UserId = null;
                // trancking.UserId = monthFixedExpenses.UserId;
                trancking.BankAccountId = null;
                trancking.PixId = null;
                trancking.CardId = null;
                trancking.OthersPaymentMethods = null;
                trancking.WasPaid = DateTime.MinValue;
                trancking.Expiration = expirationDate;
                trancking.Registered = DateTime.Now;
                trancking.Price = monthFixedExpenses.Price;
                trancking.Interest = 0;
                tranckings.Add(trancking);
            }

            return tranckings;
        }

        public List<YearlyFixedExpensesTrackingDto> AddYearlyFixedExpensesTracking(YearlyFixedExpensesDto yearlyFixedExpenses)
        {
            YearlyFixedExpensesTrackingDto trancking = new();
            var tranckings = new List<YearlyFixedExpensesTrackingDto>();

            trancking.Id = 0;
            trancking.CompanyId = yearlyFixedExpenses.CompanyId;
            trancking.UserId = null;
            trancking.UserId = yearlyFixedExpenses.UserId;
            trancking.BankAccountId = null;
            trancking.PixId = null;
            trancking.CardId = null;
            trancking.OthersPaymentMethods = null;
            trancking.WasPaid = DateTime.MinValue;
            trancking.Expiration = yearlyFixedExpenses.Expiration;
            trancking.Start = yearlyFixedExpenses.Start;
            trancking.Registered = DateTime.Now;
            trancking.Price = yearlyFixedExpenses.Price;
            trancking.Interest = 0;

            tranckings.Add(trancking);

            return tranckings;
        }





    }
}