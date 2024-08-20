using System;
using System.Collections.Generic;
using System.Linq;
using Application.Services.Shared.Seed.EntitiesSeed.Financial;
using Application.Services.Shared.Seed.EntitiesSeed.Inheritance;
using Domain.Entities.Finances.Bank;
using Domain.Entities.Finances.Enums;
using Domain.Entities.Finances.MonthlyExpenses;

using UnitOfWork.Persistence.Operations;

namespace Application.Services.Shared.Seed.EntitiesSeed.Financial
{
    public class FinancialMonthlyExpensesSeed:CommonFinancialForSeed
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
            internetExpense.UserId = 1;
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
            luzExpenses.UserId = 1;
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
            aguaExpenses.UserId = 1;
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
            meiDasExpenses.UserId = 1;
            // meiDasExpenses.ExpensesName = "Mei";


            return meiDasExpenses;
        }
    
       public List<MonthlyFixedExpense> AddExpensesSaveAllAsync()
        {
            var net = Internet();
            var elet = Eletrecidade();
            var water = Agua();
            var das = MeiDas();

            net.MonthlyFixedExpensesTrackings = new List<MonthlyFixedExpenseTracking>();
            net.MonthlyFixedExpensesTrackings = MonthlyTrackings(net);

            elet.MonthlyFixedExpensesTrackings = new List<MonthlyFixedExpenseTracking>();
            elet.MonthlyFixedExpensesTrackings = MonthlyTrackings(elet);

            water.MonthlyFixedExpensesTrackings = new List<MonthlyFixedExpenseTracking>();
            water.MonthlyFixedExpensesTrackings = MonthlyTrackings(water);

            das.MonthlyFixedExpensesTrackings = new List<MonthlyFixedExpenseTracking>();
            das.MonthlyFixedExpensesTrackings = MonthlyTrackings(das);
         
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