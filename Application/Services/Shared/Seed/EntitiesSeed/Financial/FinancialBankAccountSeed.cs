using System;
using System.Collections.Generic;
using System.Linq;
using Domain.Entities.Finances.Bank;
using Domain.Entities.Finances.Enums;
using Microsoft.EntityFrameworkCore;
using UnitOfWork.Persistence.Operations;

namespace Application.Services.Shared.Seed.EntitiesSeed
{
    public class FinancialBankAccountSeed
    {
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