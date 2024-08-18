using System;
using System.Collections.Generic;
using System.Linq;
using Domain.Entities.Finances.MonthlyExpenses;

namespace Repository.Data.Seed.EntitiesSeed.Financial
{
    public class FinancialMonthlyExpensesSeed
    {
      
        DateTime today = DateTime.Now;
        private MonthlyFixedExpense Internet()
        {
            var internetExpense = new MonthlyFixedExpense(1,
             "Net Claro escritório e casa.",
             new DateTime(today.Year, today.Month, 20),
             "https://auth.claro.com.br/authorize?client_id=MINHA_CLARO_RESIDENCIAL&redirect_uri=https%3A%2F%2Fminhaclaroresidencial.claro.com.br%2Flogin&response_type=code&scope=openid+minha_net+net_profile&authMs=UP%2CEP%2CDOCP%2COTP",
             "08015494699",
             "http2023$"
             );

            internetExpense.Id = 0;

            internetExpense.CategoryExpenseId = 1;
            internetExpense.SubcategoryExpenseId = 1;
            internetExpense.Price = 150;

            return internetExpense;
        }
        private MonthlyFixedExpense Eletrecidade()
        {
            var luzExpenses = new MonthlyFixedExpense(1,
             "Cemig conta de luz",
             new DateTime(today.Year, today.Month, 06),
             "https://atende.cemig.com.br/Home",
             "53873297604",
             "http2018$"
             );
            luzExpenses.CategoryExpenseId = 1;
            luzExpenses.SubcategoryExpenseId = 2;
            // luzExpenses.ExpensesName =" Tarifa luz eletrica residência";
            luzExpenses.Price = 250;

            return luzExpenses;
        }
        private MonthlyFixedExpense Agua()
        {
            var aguaExpenses = new MonthlyFixedExpense(1,
             "Conta de água copasa",
             new DateTime(today.Year, today.Month, 15),
             "https://copasaportalprd.azurewebsites.net/Copasa.Portal/Login/index",
             "27894711691",
             "marco1"
             );

            aguaExpenses.Price = 100;
            // aguaExpenses.ExpensesName = "Tarifa água residência";
            aguaExpenses.CategoryExpenseId = 1;
            aguaExpenses.SubcategoryExpenseId = 3;

            return aguaExpenses;
        }
        private MonthlyFixedExpense MeiDas()
        {
            var meiDasExpenses = new MonthlyFixedExpense(1,
             "(Mei) Das do Microempreendedor Individual",
             new DateTime(today.Year, today.Month, 12),
             "http://www8.receita.fazenda.gov.br/simplesnacional/aplicacoes/atspo/pgmei.app/identificacao",
             "20117026000121",
             ""
             );

            meiDasExpenses.Price = 75;
            meiDasExpenses.CategoryExpenseId = 2;
            meiDasExpenses.SubcategoryExpenseId = 4;
            // meiDasExpenses.ExpensesName = "Mei";


            return meiDasExpenses;
        }
        public List<MonthlyFixedExpenseTracking> AddTrackingEntity(MonthlyFixedExpense monthlyFixedExpense)
        {

            var today = DateTime.Now;

            var tranckings = new List<MonthlyFixedExpenseTracking>();

            MonthlyFixedExpenseTracking trancking;
            DateTime expirationDate;

            for (int n = today.Month; n <= 12; n++)
            {
                trancking = new MonthlyFixedExpenseTracking();
                expirationDate = new DateTime(today.Year, n, monthlyFixedExpense.Expires.Day);
                trancking.CompanyId = monthlyFixedExpense.CompanyId;
                trancking.UserId = null;
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
        public List<MonthlyFixedExpense> AddExpensesSaveAllAsync()
        {
            var net = Internet();
            var elet = Eletrecidade();
            var water = Agua();
            var das = MeiDas();

            net.MonthlyFixedExpensesTrackings = new List<MonthlyFixedExpenseTracking>();
            net.MonthlyFixedExpensesTrackings = AddTrackingEntity(net);

            elet.MonthlyFixedExpensesTrackings = new List<MonthlyFixedExpenseTracking>();
            elet.MonthlyFixedExpensesTrackings = AddTrackingEntity(elet);

            water.MonthlyFixedExpensesTrackings = new List<MonthlyFixedExpenseTracking>();
            water.MonthlyFixedExpensesTrackings = AddTrackingEntity(water);

            das.MonthlyFixedExpensesTrackings = new List<MonthlyFixedExpenseTracking>();
            das.MonthlyFixedExpensesTrackings = AddTrackingEntity(das);

            Expenses expenses = new();
            var resultHomeExpenses = expenses.HomeExpenses();
            var resultWorkExpenses = expenses.WorkExpenses();

            net.CategoryExpense = resultHomeExpenses;
            elet.CategoryExpense = resultHomeExpenses;
            water.CategoryExpense = resultHomeExpenses;

            das.CategoryExpense = resultWorkExpenses;

            var monthly = new List<MonthlyFixedExpense>{
                    net,
                    elet,
                    water,
                    das,
            };
            return monthly;
        }

    }
}