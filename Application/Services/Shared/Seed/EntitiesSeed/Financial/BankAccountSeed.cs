using System;
using System.Collections.Generic;
using Application.Services.Shared.Seed.EntitiesSeed.Inheritance;
using Domain.Entities.Finances.Bank;
using Domain.Entities.Finances.Enums;

namespace Application.Services.Shared.Seed.EntitiesSeed.Financial
{
    public class BankAccountSeed : CommonFinancialForSeed
    {
        DateTime today = DateTime.Now;

        private List<Card> cards1()
        {

            var cardsListMaker = new List<Card>();

            var card1 = new Card()
            {
                Id = 1,
                CompanyId = 1,
                UserId = 1,
                Holder = "Marcus Vinícius Dias",
                Flag = "Elo",
                CreditLimit = 4800,
                Type = TypeCardEnum.Credit,
                CreditCardLimitOperation = new()
                {
                    CardId = 1,
                    UserId = 1,
                    CompanyId = 1,
                    LimitCreditUsed = 0,
                    Registered = DateTime.UtcNow,
                    PriceOfLastPayment = 0,
                    LastPayment = DateTime.MinValue,
                },
                Number = "6505070326070463",
                CVC = 693,
                Description = "Gastos geral No Stop",
                Validate = new DateTime(2028, 03, 03),
                ClosingDate = new DateTime(2028, 03, 15),
                ExpiresDate = new DateTime(2028, 03, 25),
                Registered = DateTime.Now,
                Deleted = false,
            };
            card1.CreditCardExpensesInvoices = CreditCardInvoicesListMake(card1);

            var card2 = new Card()
            {
                Id = 2,
                CompanyId = 1,
                UserId = 1,
                Holder = "Marcus Vinícius Dias",
                Flag = "Elo",
                CreditLimit = 0,
                Type = TypeCardEnum.Debit,
                Number = "6500325667570223",
                CVC = 725,
                Description = "Gastos geral No Stop",
                Validate = new DateTime(2028, 03, 03),
                ClosingDate = new DateTime(2028, 03, 15),
                ExpiresDate = new DateTime(2028, 03, 25),
                Registered = DateTime.Now,
                Deleted = false
            };

            cardsListMaker.Add(card1);
            cardsListMaker.Add(card2);
            return cardsListMaker;
        }
        private List<Card> cards2()
        {

            var cardsListMaker22 = new List<Card>();

            var card22 = new Card()
            {
                Id = 3,
                CompanyId = 1,
                UserId = 1,
                Holder = "Marcus Vinícius Dias",
                Flag = "MasterCard",
                CreditLimit = 1700,
                Type = TypeCardEnum.Credit,
                CreditCardLimitOperation = new()
                {
                    CardId = 3,
                    UserId = 1,
                    CompanyId = 1,
                    LimitCreditUsed = 0,
                    Registered = DateTime.UtcNow,
                    PriceOfLastPayment = 0,
                    LastPayment = DateTime.MinValue,
                },
                Number = "2306505802508973",
                CVC = 498,
                Description = "Gastos com transporte em geral.",
                Validate = new DateTime(2029, 02, 02),
                ClosingDate = new DateTime(2029, 03, 15),
                ExpiresDate = new DateTime(2029, 03, 25),
                Registered = DateTime.Now,
                Deleted = false
            };

            card22.CreditCardExpensesInvoices = CreditCardInvoicesListMake(card22);
            cardsListMaker22.Add(card22);
            return cardsListMaker22;
        }
        private BankAccount BankAccountCefPersonal()
        {


            var bnkAccount = new BankAccount
            {
                Id = 1,
                CompanyId = 1,
                UserId = 1,
                Holder = "Marcus Vinícius Dias",
                Institution = "CEF - OP 001",
                Account = "00035838 - 2",
                Agency = "0087",
                ManagerName = null,
                ManagerContact = null,
                Balance = 80,
                Type = TypeAccountEnum.savingsAccount,
                Description = "Conta pessoal",
                Registered = DateTime.Now,
                Deleted = false
            };
            bnkAccount.Cards = cards1();
            bnkAccount.Pixes = new(){
                 new Pix() { Id = 1, Key = "CEL", Value = "31982154642" }
};

            return bnkAccount;
        }
        private BankAccount BankAccountInterPersonal()
        {
            var bnkAccount = new BankAccount
            {
                Id = 2,
                CompanyId = 1,
                UserId = 1,
                Holder = "Marcus Vinícius Dias",
                Institution = "Inter",
                Account = "3447529-0",
                Agency = "0001",
                ManagerName = null,
                ManagerContact = null,
                Balance = 8,
                Type = TypeAccountEnum.savingsAccount,
                Description = "Conta pessoal",
                Registered = DateTime.Now,
                Deleted = false
            };
            bnkAccount.Cards = cards2();
            bnkAccount.Pixes = new(){
            new Pix() { Id = 2, Key = "CPF", Value = "08015494699" }
            };
            return bnkAccount;
        }

        public Card SingleCreditCard()
        {
            var single = new Card()
            {
                Id = 13,
                CompanyId = 1,
                UserId = 1,
                Holder = "Marcus Vinícius Dias",
                Flag = "MasterCard",
                CreditLimit = 1000,
                Type = TypeCardEnum.Credit,
                CreditCardLimitOperation = new()
                {
                    CardId = 13,
                    UserId = 1,
                    CompanyId = 1,
                    LimitCreditUsed = 0,
                    Registered = DateTime.UtcNow,
                    PriceOfLastPayment = 0,
                    LastPayment = DateTime.MinValue,
                },
                Number = "4929454402197510",
                CVC = 498,
                Description = "Gastos com transporte em geral.",
                Validate = new DateTime(2025, 05, 13),
                ClosingDate = new DateTime(2029, 01, 20),
                ExpiresDate = new DateTime(2029, 01, 30),
                Registered = DateTime.Now,
                Deleted = false
            };
            return single;
        }


        public List<BankAccount> AddBankAccountSaveAllAsync()
        {
            var banks = new List<BankAccount>{
                BankAccountCefPersonal(),
                BankAccountInterPersonal()
            };

            return banks;
        }

    }
}