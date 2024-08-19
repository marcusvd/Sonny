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

            var yearlyFixedExpense = new YearlyFixedExpense
            {
                Id = 0,
                Description = "DDNS Winco para acesso remoto",
                LinkCopyBill = "https://ddns.winco.com.br/account/login.php",
                USERLinkCopyBill = "marcusmvd@yahoo.com.br",
                PASSLinkCopyBill = "123321",
                Price = 150,
                AutoRenew = true,
                CategoryExpenseId = 2,
                SubcategoryExpenseId = 5,
                CompanyId = 1,
                UserId = 1,
                Expires = new DateTime(2026, 08, 16),
                Start = start,
                Registered = new DateTime(),
                Deleted = false,

            };
            return yearlyFixedExpense;
        }
        private YearlyFixedExpense EmailDomainNameProvider()
        {
            DateTime start = new(2023, 12, 16);

            var yearlyFixedExpense = new YearlyFixedExpense
            {
                Id = 0,
                Description = "Kinghost Provedor do domínio, nostoti.com.br / Emails @nostopti.com.br",
                LinkCopyBill = "https://login.kinghost.com.br/?referrer=https:%2F%2Fpainel.kinghost.com.br%2Findex.php",
                USERLinkCopyBill = "marcusmvd@yahoo.com.br",
                PASSLinkCopyBill = "123321",
                AutoRenew = true,
                CategoryExpenseId = 2,
                SubcategoryExpenseId = 6,
                CompanyId = 1,
                UserId = 1,
                Expires = new DateTime(2024, 12, 16),
                Start = start,
                Registered = new DateTime(),
                Price = 550,
                Deleted = false,
            };

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

            winco.YearlyFixedExpensesTrackings = new();
            winco.YearlyFixedExpensesTrackings = AddTrackingEntity(winco);

            provider.YearlyFixedExpensesTrackings = new();
            provider.YearlyFixedExpensesTrackings = AddTrackingEntity(provider);

            var Yearly = new List<YearlyFixedExpense>{
                    winco,
                    provider
            };
            return Yearly;
        }


    }
}