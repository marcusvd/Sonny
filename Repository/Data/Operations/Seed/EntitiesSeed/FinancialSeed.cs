using System;
using System.Collections.Generic;
using Domain.Entities.Finances.Bank;
using Domain.Entities.Finances.Enums;
using Domain.Entities.Finances.MonthlyExpenses;
using Microsoft.EntityFrameworkCore;
using Repository.Data.Context;
using Repository.Data.Operations.Seed.EntitiesSeed.Financial;

namespace Repository.Data.Operations.Seed.EntitiesSeed
{
    public class Seed_NSTI : IDisposable
    {
        private bool _disposed = false;
        private readonly SonnyDbContext _context;
        public Seed_NSTI(SonnyDbContext context)
        {
            _context = context;
        }
        DateTime today = DateTime.Now;
        private BankAccount BankAccountCefPersonal()
        {

            var bnkAccount = new BankAccount(
                1,
                "Marcus Vinícius Dias",
                "CEF - OP 001",
                "00035838 - 2",
                "0087",
                null,
                null,
                80,
                TypeAccountEnum.savingsAccount,
                "Conta pessoal"
            );
            bnkAccount.Cards.Add(
                new Card(
                "Marcus Vinícius Dias",
                "Elo",
                4800,
                TypeCardEnum.Credit,
                "6505070326070463",
                693,
                "Gastos geral No Stop",
                new DateTime(2028, 03, 03)
            ));
            bnkAccount.Cards.Add(
               new Card(
                "Marcus Vinícius Dias",
                "Elo",
                0,
                TypeCardEnum.Debit,
                "6500325667570223",
                725,
                "Gastos geral No Stop",
                new DateTime(2031, 11, 11)
            ));
            bnkAccount.Pixes.Add(
                new Pix() { Key = "CEL", Value = "31982154642" }
            );

            return bnkAccount;
        }
        private BankAccount BankAccountInterPersonal()
        {

            var bnkAccount = new BankAccount(
                1,
                "Marcus Vinícius Dias",
                "Inter",
                "3447529-0",
                "0001",
                null,
                null,
                6,
                TypeAccountEnum.savingsAccount,
                "Conta pessoal"
            );
            bnkAccount.Cards.Add(new Card(
                "Marcus Vinícius Dias",
                "MasterCard",
                1700,
                TypeCardEnum.Credit,
                "2306505802508973",
                498,
                "Gastos com transporte em geral.",
                new DateTime(2029, 02, 02)
            ));
            bnkAccount.Pixes.Add(
                           new Pix() { Key = "CPF", Value = "08015494699" }
                       );
            return bnkAccount;
        }

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


        // private MonthlyFixedExpense DominioSiteEmailProvedor()
        // {
        //     var provedor = new MonthlyFixedExpense();
        //     provedor.Id = 0;
        //     provedor.CompanyId = 1;
        //     provedor.Name = "Provedor";

        //     var provedorExpenses = new MonthlyFixedExpense(1,
        //      " Email, Site e Domínio",
        //      new DateTime(2024, 12, 12),
        //      "https://login.kinghost.com.br/?referrer=https:%2F%2Fpainel.kinghost.com.br%2Findex.php",
        //      "marcusmvd@yahoo.com.br",
        //      "Http2023$"
        //      );
        //     provedorExpenses.Name = provedor;
        //     return provedorExpenses;
        // }


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
        public List<BankAccount> AddBankAccountSaveAllAsync()
        {
            var banks = new List<BankAccount>{
                BankAccountCefPersonal(),
                BankAccountInterPersonal()
            };

            return banks;
        }
        // public void AddBankAccountSaveAllAsync()
        // {
        //     _context.AddRangeAsync(
        //         BankAccountCefPersonal(),
        //         BankAccountInterPersonal()
        //    );
        // }
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
        // public async void AddExpensesSaveAllAsync()
        // {
        //     var net = Internet();
        //     var elet = Eletrecidade();
        //     var water = Agua();
        //     var das = MeiDas();

        //     net.MonthlyFixedExpensesTrackings = new List<MonthlyFixedExpenseTracking>();
        //     net.MonthlyFixedExpensesTrackings = AddTrackingEntity(net);

        //     elet.MonthlyFixedExpensesTrackings = new List<MonthlyFixedExpenseTracking>();
        //     elet.MonthlyFixedExpensesTrackings = AddTrackingEntity(elet);

        //     water.MonthlyFixedExpensesTrackings = new List<MonthlyFixedExpenseTracking>();
        //     water.MonthlyFixedExpensesTrackings = AddTrackingEntity(water);

        //     das.MonthlyFixedExpensesTrackings = new List<MonthlyFixedExpenseTracking>();
        //     das.MonthlyFixedExpensesTrackings = AddTrackingEntity(das);

        //     Expenses expenses = new();
        //     var resultHomeExpenses = expenses.HomeExpenses();
        //     var resultWorkExpenses = expenses.WorkExpenses();

        //     net.CategoryExpense = resultHomeExpenses;
        //     elet.CategoryExpense = resultHomeExpenses;
        //     water.CategoryExpense = resultHomeExpenses;

        //     das.CategoryExpense = resultWorkExpenses;

        //     await _context.AddRangeAsync(net, elet, water, das);
        //     await _context.DisposeAsync();
        // }

        public async void checkAndAdd()
        {
            var FN_Bank = await _context.FN_BankAccount.AnyAsync();
            if (!FN_Bank)
                await _context.AddRangeAsync(AddBankAccountSaveAllAsync());
            //_context.AddRange(financials.AddExpensesSaveAllAsync());
        }


        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }

        protected virtual void Dispose(bool disposing)
        {
            if (!_disposed)
            {
                if (disposing)
                {
                    // Dispose managed resources
                    _context.Dispose();
                }

                // Dispose unmanaged resources

                _disposed = true;
            }
        }


    }
}