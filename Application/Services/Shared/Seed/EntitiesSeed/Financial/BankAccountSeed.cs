using System;
using System.Collections.Generic;
using Domain.Entities.Finances.Bank;
using Domain.Entities.Finances.Enums;

namespace Application.Services.Shared.Seed.EntitiesSeed.Financial
{
    public class BankAccountSeed
    {
        DateTime today = DateTime.Now;
        private BankAccount BankAccountCefPersonal()
        {

            var bnkAccount = new BankAccount()
            {
                Id = 1,
                CompanyId = 1,
                Holder = "Marcus Vinícius Dias",
                Institution = "CEF - OP 001",
                Account = "00035838 - 2",
                Agency = "0087",
                ManagerName = null,
                ManagerContact = null,
                Balance = 80,
                Type = TypeAccountEnum.savingsAccount,
                Description = "Conta pessoal",
                Deleted = false
            };
            bnkAccount.Cards = new()  {
                new Card(){
                Id =1,
                Holder = "Marcus Vinícius Dias",
                Flag = "Elo",
                Limit = 4800,
                Type = TypeCardEnum.Credit,
                Number = "6505070326070463",
                CVC = 693,
                Description= "Gastos geral No Stop",
                Validate = new DateTime(2028, 03, 03),
                ClosingDate = new DateTime(2028, 03, 15),
                ExpiresDate = new DateTime(2028, 03, 25),
                Deleted = false
                },
                new Card(){
                Id =2,
                Holder = "Marcus Vinícius Dias",
                Flag = "Elo",
                Limit = 0,
                Type = TypeCardEnum.Debit,
                Number = "6500325667570223",
                CVC = 725,
                Description= "Gastos geral No Stop",
                Validate = new DateTime(2028, 03, 03),
                ClosingDate = new DateTime(2028, 03, 15),
                ExpiresDate = new DateTime(2028, 03, 25),
                Deleted = false
                }
            };
            bnkAccount.Pixes = new(){
                 new Pix() {Id = 1, Key = "CEL", Value = "31982154642" }
            };

            return bnkAccount;
        }
        private BankAccount BankAccountInterPersonal()
        {
            var bnkAccount = new BankAccount()
            {
                Id = 2,
                CompanyId = 1,
                Holder = "Marcus Vinícius Dias",
                Institution = "Inter",
                Account = "3447529-0",
                Agency = "0001",
                ManagerName = null,
                ManagerContact = null,
                Balance = 8,
                Type = TypeAccountEnum.savingsAccount,
                Description = "Conta pessoal",
                Deleted = false
            };
            bnkAccount.Cards = new(){
                new Card(){
                Id =3,
                Holder = "Marcus Vinícius Dias",
                Flag = "MasterCard",
                Limit = 1700,
                Type = TypeCardEnum.Credit,
                Number = "2306505802508973",
                CVC = 498,
                Description= "Gastos com transporte em geral.",
                Validate =  new DateTime(2029, 02, 02),
                ClosingDate = new DateTime(2029, 03, 15),
                ExpiresDate = new DateTime(2029, 03, 25),
                Deleted = false
                },
            };
            bnkAccount.Pixes = new(){
            new Pix() { Id = 2, Key = "CPF", Value = "08015494699" }
            };
            return bnkAccount;
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