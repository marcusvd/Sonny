using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Domain.Entities.Finances;
using Domain.Entities.Finances.Enums;
using Domain.Entities.Main;

using Domain.Entities.Main.Enums;
using Domain.Entities.Shared;
using Repository.Data.Context;

namespace Repository.Data.Operations.Seed.EntitiesSeed
{
    public class FinancialSeed_NSTI
    {

        private readonly SonnyDbContext _context;
        public FinancialSeed_NSTI(SonnyDbContext context)
        {
            _context = context;
        }

        private FinancialBankAccount BankAccountCefPersonal()
        {

            var bnkAccount = new FinancialBankAccount(
                1,
                "Marcus Vinícius Dias",
                "CEF - OP 001",
                "00035838 - 2",
                "0087",
                null,
                null,
                "31982154642",
                80,
                TypeAccountEnum.savingsAccount,
                "Conta pessoal"
            );
            bnkAccount.Cards.Add(
                new FinancialCard(
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
               new FinancialCard(
                "Marcus Vinícius Dias",
                "Elo",
                0,
                TypeCardEnum.Debit,
                "6500325667570223",
                725,
                "Gastos geral No Stop",
                new DateTime(2031, 11, 11)
            ));


            return bnkAccount;
        }
        private FinancialBankAccount BankAccountInterPersonal()
        {

            var bnkAccount = new FinancialBankAccount(
                1,
                "Marcus Vinícius Dias",
                "Inter",
                "3447529-0",
                "0001",
                null,
                null,
                "08015494699",
                6,
                TypeAccountEnum.savingsAccount,
                "Conta pessoal"
            );
            bnkAccount.Cards.Add(new FinancialCard(
                "Marcus Vinícius Dias",
                "MasterCard",
                1700,
                TypeCardEnum.Credit,
                "2306505802508973",
                498,
                "Gastos com transporte em geral.",
                new DateTime(2029, 02, 02)
            ));

            return bnkAccount;
        }
        private FinancialExpenses Internet()
        {
            var internet = new FinancialExpenses(1,
             "INTERNET",
             "Net Claro escritório e casa.",
             new DateTime(2024, 01, 20),
             1,
             CyclePaymentEnum.Month,
             "https://auth.claro.com.br/authorize?client_id=MINHA_CLARO_RESIDENCIAL&redirect_uri=https%3A%2F%2Fminhaclaroresidencial.claro.com.br%2Flogin&response_type=code&scope=openid+minha_net+net_profile&authMs=UP%2CEP%2CDOCP%2COTP",
             "08015494699",
             "http2023$"
             );

            return internet;
        }
        private FinancialExpenses Eletrecidade()
        {
            var luz = new FinancialExpenses(1,
             "Luz",
             "Cemig conta de luz",
             new DateTime(2024, 01, 06),
             1,
             CyclePaymentEnum.Month,
             "https://atende.cemig.com.br/Home",
             "53873297604",
             "http2018$"
             );

            return luz;
        }
        private FinancialExpenses Agua()
        {
            var agua = new FinancialExpenses(1,
             "Água",
             "Água conta de água",
             new DateTime(2024, 01, 31),
             1,
             CyclePaymentEnum.Month,
             "https://copasaportalprd.azurewebsites.net/Copasa.Portal/Login/index",
             "27894711691",
             "marco1"
             );

            return agua;
        }
        private FinancialExpenses DominioSiteEmailProvedor()
        {
            var provedor = new FinancialExpenses(1,
             "Provedor",
             " Email, Site e Domínio",
             new DateTime(2024, 12, 12),
             1,
             CyclePaymentEnum.Year,
             "https://login.kinghost.com.br/?referrer=https:%2F%2Fpainel.kinghost.com.br%2Findex.php",
             "marcusmvd@yahoo.com.br",
             "Http2023$"
             );

            return provedor;
        }
        private FinancialExpenses MeiDas()
        {
            var meiDas = new FinancialExpenses(1,
             "Mei",
             "DAS do Microempreendedor Individual",
             new DateTime(2024, 12, 12),
             1,
             CyclePaymentEnum.SpecificDate,
             "http://www8.receita.fazenda.gov.br/simplesnacional/aplicacoes/atspo/pgmei.app/identificacao",
             "20117026000121",
             ""
             );

            return meiDas;
        }
     
        public void AddBankAccountSaveAllAsync()
        {
            _context.AddRangeAsync(
                BankAccountCefPersonal(),
                BankAccountInterPersonal()
           );
        }
        public void AddExpensesSaveAllAsync()
        {
            _context.AddRangeAsync(
                Internet(),
                Eletrecidade(),
                Agua(),
                DominioSiteEmailProvedor(),
                MeiDas()
           );
        }

    }
}