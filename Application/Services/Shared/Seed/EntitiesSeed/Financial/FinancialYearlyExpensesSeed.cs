using System;
using System.Collections.Generic;
using System.Linq;
using Application.Services.Shared.Seed.EntitiesSeed.Financial;
using Domain.Entities.Finances.Bank;
using Domain.Entities.Finances.Enums;
using Domain.Entities.Finances.MonthlyExpenses;
using Domain.Entities.Finances.YearlyExpenses;
using UnitOfWork.Persistence.Operations;

namespace Application.Services.Shared.Seed.EntitiesSeed
{
    public class FinancialYearlyExpensesSeed
    {
        DateTime today = DateTime.Now;
        private YearlyFixedExpense WincoDdns()
        {
            DateTime start = new(2024, 08, 16);

            var yearlyFixedExpense = new YearlyFixedExpense();
            yearlyFixedExpense.Id = 0;
            yearlyFixedExpense.Description = "DDNS Winco para acesso remoto";
            yearlyFixedExpense.LinkCopyBill = "https://ddns.winco.com.br/account/login.php";
            yearlyFixedExpense.USERLinkCopyBill = "marcusmvd@yahoo.com.br";
            yearlyFixedExpense.PASSLinkCopyBill = "123321";
            yearlyFixedExpense.Price = 150;
            yearlyFixedExpense.AutoRenew = true;
            yearlyFixedExpense.CategoryExpenseId = 2;
            yearlyFixedExpense.SubcategoryExpenseId = 5;
            yearlyFixedExpense.CompanyId = 1;
            yearlyFixedExpense.UserId = 1;
            yearlyFixedExpense.Expires = new DateTime(2026, 08, 16);
            yearlyFixedExpense.Start = start;
            yearlyFixedExpense.Registered = new DateTime();
            yearlyFixedExpense.Price = 230;
            yearlyFixedExpense.Deleted = false;
            return yearlyFixedExpense;
        }
        private YearlyFixedExpense EmailDomainNameProvider()
        {
            DateTime start = new(2023, 12, 16);

            var yearlyFixedExpense = new YearlyFixedExpense();
            yearlyFixedExpense.Id = 0;
            yearlyFixedExpense.Description = "Kinghost Provedor do domínio, nostoti.com.br / Emails @nostopti.com.br";
            yearlyFixedExpense.LinkCopyBill = "https://login.kinghost.com.br/?referrer=https:%2F%2Fpainel.kinghost.com.br%2Findex.php";
            yearlyFixedExpense.USERLinkCopyBill = "marcusmvd@yahoo.com.br";
            yearlyFixedExpense.PASSLinkCopyBill = "123321";
            yearlyFixedExpense.Price = 150;
            yearlyFixedExpense.AutoRenew = true;
            yearlyFixedExpense.CategoryExpenseId = 2;
            yearlyFixedExpense.SubcategoryExpenseId = 6;
            yearlyFixedExpense.CompanyId = 1;
            yearlyFixedExpense.UserId = 1;
            yearlyFixedExpense.Expires = new DateTime(2024, 12, 16);
            yearlyFixedExpense.Start = start;
            yearlyFixedExpense.Registered = new DateTime();
            yearlyFixedExpense.Price = 550;
            yearlyFixedExpense.Deleted = false;
            return yearlyFixedExpense;
        }

        public List<YearlyFixedExpenseTracking> AddTrackingEntity(YearlyFixedExpense yearlyFixedExpense)
        {

            var today = DateTime.Now;

            var tranckings = new List<YearlyFixedExpenseTracking>();
            tranckings.Add(
                new YearlyFixedExpenseTracking()
                {
                    CompanyId = yearlyFixedExpense.CompanyId,
                    UserId = yearlyFixedExpense.UserId,
                    BankAccountId = null,
                    PixId = null,
                    CardId = null,
                    OthersPaymentMethods = null,
                    WasPaid = DateTime.MinValue,
                    Start = yearlyFixedExpense.Start,
                    Expires = yearlyFixedExpense.Expires,
                    Registered = DateTime.Now,
                    Price = yearlyFixedExpense.Price,
                    Interest = 0,
                    Deleted = false,
                }
            );
         
            return tranckings;
        }
        public List<YearlyFixedExpense> AddYearlyExpensesSaveAllAsync()
        {
            var winco = WincoDdns();
            var provider = EmailDomainNameProvider();

            winco.YearlyFixedExpensesTrackings = new List<YearlyFixedExpenseTracking>();
            winco.YearlyFixedExpensesTrackings = AddTrackingEntity(winco);

            provider.YearlyFixedExpensesTrackings = new List<YearlyFixedExpenseTracking>();
            provider.YearlyFixedExpensesTrackings = AddTrackingEntity(provider);

            // CaExpenses expenses = new();
            // var resultHomeExpenses = expenses.HomeExpenses();
            // var resultWorkExpenses = expenses.WorkExpenses();

            // net.CategoryExpense = resultHomeExpenses;
            // elet.CategoryExpense = resultHomeExpenses;
            // water.CategoryExpense = resultHomeExpenses;

            // das.CategoryExpense = resultWorkExpenses;

            var monthly = new List<YearlyFixedExpense>{
                    winco,
                    provider
            };
            return monthly;
        }


    }
}