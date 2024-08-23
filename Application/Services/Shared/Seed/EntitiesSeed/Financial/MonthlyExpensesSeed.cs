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
    public class FinancialMonthlyExpensesSeed : CommonFinancialForSeed
    {
        DateTime today = DateTime.Now;
        private MonthlyFixedExpense Internet()
        {
            var internetExpense = new MonthlyFixedExpense()
            {
                Id = 0,
                CompanyId = 1,
                UserId = 1,
                CategoryExpenseId = 1,
                SubcategoryExpenseId = 1,
                Name = "Net Claro escritório e casa.",
                Price = 150,
                Registered = new DateTime(),
                Expires = new DateTime(today.Year, today.Month, 20),
                LinkCopyBill = "https://auth.claro.com.br/authorize?client_id=MINHA_CLARO_RESIDENCIAL&redirect_uri=https%3A%2F%2Fminhaclaroresidencial.claro.com.br%2Flogin&response_type=code&scope=openid+minha_net+net_profile&authMs=UP%2CEP%2CDOCP%2COTP",
                USERLinkCopyBill = "08015494699",
                PASSLinkCopyBill = "abc"
            };
            return internetExpense;
        }
        private MonthlyFixedExpense Eletrecidade()
        {
            var luzExpenses = new MonthlyFixedExpense()
            {
                Id = 0,
                CompanyId = 1,
                UserId = 1,
                CategoryExpenseId = 1,
                SubcategoryExpenseId = 2,
                Name = "Cemig conta de luz",
                Price = 250,
                Registered = new DateTime(),
                Expires = new DateTime(today.Year, today.Month, 06),
                LinkCopyBill = "https://atende.cemig.com.br/Home",
                USERLinkCopyBill = "53873297604",
                PASSLinkCopyBill = "abc"
            };

            return luzExpenses;
        }
        private MonthlyFixedExpense Agua()
        {

            var aguaExpenses = new MonthlyFixedExpense()
            {
                Id = 0,
                CompanyId = 1,
                UserId = 1,
                CategoryExpenseId = 1,
                SubcategoryExpenseId = 3,
                Name = "Conta de água copasa",
                Price = 100,
                Registered = new DateTime(),
                Expires = new DateTime(today.Year, today.Month, 15),
                LinkCopyBill = "https://copasaportalprd.azurewebsites.net/Copasa.Portal/Login/index",
                USERLinkCopyBill = "27894711691",
                PASSLinkCopyBill = "marco1"
            };

            return aguaExpenses;
        }
        private MonthlyFixedExpense MeiDas()
        {
            var meiDasExpenses = new MonthlyFixedExpense()
            {
                Id = 0,
                CompanyId = 1,
                UserId = 1,
                CategoryExpenseId = 2,
                SubcategoryExpenseId = 4,
                Name = "(Mei) Das do Microempreendedor Individual",
                Price = 75,
                Registered = new DateTime(),
                Expires = new DateTime(today.Year, today.Month, 12),
                LinkCopyBill = "http://www8.receita.fazenda.gov.br/simplesnacional/aplicacoes/atspo/pgmei.app/identificacao",
                USERLinkCopyBill = "20117026000121",
                PASSLinkCopyBill = "abc"
            };

            return meiDasExpenses;
        }

        public List<MonthlyFixedExpense> AddExpensesSaveAllAsync()
        {
            var net = Internet();
            
            var elet = Eletrecidade();
            var water = Agua();
            var das = MeiDas();

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