using System.Collections.Generic;
using Application.Services.Operations.Finances.Dtos.Enums;
using Application.Services.Operations.Finances.Dtos.Bank;
using Domain.Entities.Finances.Enums;
using Domain.Entities.Finances.Bank;
using Application.Services.Shared.Dtos.Mappers;


namespace Application.Services.Operations.Finances.Dtos.Mappers
{
    public partial class FinancialObjectMapperServices: CommonObjectMapper, IFinancialObjectMapperServices
    {
        public List<BankAccountDto> BankAccountListMake(List<BankAccount> list)
        {
            if (list == null) return null;

            var toReturn = new List<BankAccountDto>();

            list.ForEach(x =>
            {
                toReturn.Add(BankAccountMapper(x));
            });

            return toReturn;
        }
        public List<BankAccount> BankAccountListMake(List<BankAccountDto> list)
        {
            if (list == null) return null;

            var toReturn = new List<BankAccount>();

            list.ForEach(x =>
            {
                toReturn.Add(BankAccountMapper(x));
                toReturn.ForEach(y =>
                {
                    if (x.Cards != null)
                    {
                        y.Cards = new();
                        y.Cards.AddRange(CardListMake(x.Cards));
                    }
                });

            });


            return toReturn;
        }
        public BankAccountDto BankAccountMapper(BankAccount entity)
        {
            if (entity == null) return null;

            var obj = new BankAccountDto()
            {
                Id = entity.Id,
                UserId = entity.UserId,
                CompanyId = entity.CompanyId,
                Holder = entity.Holder,
                Institution = entity.Institution,
                Account = entity.Account,
                Agency = entity.Agency,
                ManagerName = entity.ManagerName,
                ManagerContact = entity.ManagerContact,
                Balance = entity.Balance,
                Deleted = entity.Deleted,
                Registered = entity.Registered,
                Description = entity.Description,
                Type = (TypeAccountEnumDto)entity.Type,
                Cards = CardListMake(entity.Cards),
                Pixes = PixListMake(entity.Pixes)
            };

            return obj;
        }
        public BankAccount BankAccountMapper(BankAccountDto entity)
        {
            if (entity == null) return null;

            var obj = new BankAccount()
            {
                Id = entity.Id,
                UserId = entity.UserId,
                CompanyId = entity.CompanyId,
                Holder = entity.Holder,
                Institution = entity.Institution,
                Account = entity.Account,
                Agency = entity.Agency,
                ManagerName = entity.ManagerName,
                ManagerContact = entity.ManagerContact,
                Balance = entity.Balance,
                Deleted = entity.Deleted,
                Registered = entity.Registered,
                Description = entity.Description,
                Type = (TypeAccountEnum)entity.Type,
                Cards = CardListMake(entity.Cards),
                Pixes = PixListMake(entity.Pixes)
            };

            return obj;
        }
        public BankAccount BankAccountUpdateMapper(BankAccountDto dto, BankAccount db)
        {
            if (dto == null) return null;
            if (db == null) return null;

            db.Id = dto.Id;
            db.UserId = dto.UserId;
            db.CompanyId = dto.CompanyId;
            db.Holder = dto.Holder;
            db.Institution = dto.Institution;
            db.Account = dto.Account;
            db.Agency = dto.Agency;
            db.ManagerName = dto.ManagerName;
            db.ManagerContact = dto.ManagerContact;
            db.Balance = dto.Balance;
            db.Description = dto.Description;
            db.Type = (TypeAccountEnum)dto.Type;
            db.Cards = CardListMake(dto.Cards);
            db.Pixes = PixListMake(dto.Pixes);
            return db;
        }
        public List<CardDto> CardListMake(List<Card> list)
        {
            if (list == null) return null;

            var toReturn = new List<CardDto>();

            list.ForEach(x =>
            {
                toReturn.Add(CardMapper(x));
            });


            return toReturn;
        }
        public List<Card> CardListMake(List<CardDto> list)
        {
            if (list == null) return null;

            var toReturn = new List<Card>();

            list.ForEach(x =>
            {
                toReturn.Add(CardMapper(x));
            });


            return toReturn;
        }
        public CardDto CardMapper(Card entity)
        {
            if (entity == null) return null;
            var card = new CardDto()
            {
                Id = entity.Id,
                UserId = entity.UserId,
                Number = entity.Number,
                CompanyId = entity.CompanyId,
                Holder = entity.Holder,
                Flag = entity.Flag,
                CreditLimit = entity.CreditLimit,
                Type = (TypeCardEnumDto)entity.Type,
                CVC = entity.CVC,
                Description = entity.Description,
                Validate = entity.Validate,
                ClosingDate = entity.ClosingDate,
                ExpiresDate = entity.ExpiresDate,
                Deleted = entity.Deleted,
                Registered = entity.Registered,
                BankAccount = BankAccountMapperHelper(entity.BankAccount),
                BankAccountId = entity.BankAccountId ?? 0,
                CreditCardLimitOperation = CreditCardLimitOperationMapper(entity.CreditCardLimitOperation),
                CreditCardExpensesInvoices = CreditCardExpensesInvoicesListMake(entity.CreditCardExpensesInvoices)
            };

            return card;
        }
        private BankAccountDto BankAccountMapperHelper(BankAccount entity)
        {
            if (entity == null) return null;

            var obj = new BankAccountDto()
            {
                Id = entity.Id,
                UserId = entity.UserId,
                CompanyId = entity.CompanyId,
                Holder = entity.Holder,
                Institution = entity.Institution,
                Account = entity.Account,
                Agency = entity.Agency,
                ManagerName = entity.ManagerName,
                ManagerContact = entity.ManagerContact,
                Balance = entity.Balance,
                Deleted = entity.Deleted,
                Registered = entity.Registered,
                Description = entity.Description,
                Type = (TypeAccountEnumDto)entity.Type,
            };

            return obj;
        }
        public Card CardMapper(CardDto entity)
        {
            if (entity == null) return null;

            var card = new Card()
            {
                Id = entity.Id,
                UserId = entity.UserId,
                Number = entity.Number,
                CompanyId = entity.CompanyId,
                Holder = entity.Holder,
                Flag = entity.Flag,
                CreditLimit = entity.CreditLimit,
                Type = (TypeCardEnum)entity.Type,
                CVC = entity.CVC,
                Description = entity.Description,
                Validate = entity.Validate,
                ClosingDate = entity.ClosingDate,
                ExpiresDate = entity.ExpiresDate,
                Deleted = entity.Deleted,
                Registered = entity.Registered,
                BankAccountId = entity.BankAccountId,
                CreditCardLimitOperation = CreditCardLimitOperationMapper(entity.CreditCardLimitOperation),
                CreditCardExpensesInvoices = CreditCardExpensesInvoicesListMake(entity.CreditCardExpensesInvoices)

            };
            return card;
        }
        public CreditCardLimitOperationDto CreditCardLimitOperationMapper(CreditCardLimitOperation entity)
        {
            if (entity == null) return null;

            var creditCardLimitOperation = new CreditCardLimitOperationDto()
            {
                Id = entity.Id,
                CardId = entity.CardId,
                UserId = entity.UserId,
                CompanyId = entity.CompanyId,
                LimitCreditUsed = entity.LimitCreditUsed,
                Registered = entity.Registered,
                PriceOfLastPayment = entity.PriceOfLastPayment,
                LastPayment = entity.LastPayment,
            };

            return creditCardLimitOperation;

        }
        public CreditCardLimitOperation CreditCardLimitOperationMapper(CreditCardLimitOperationDto entity)
        {
            if (entity == null) return null;

            var obj = new CreditCardLimitOperation()
            {
                Id = entity.Id,
                CardId = entity.CardId,
                UserId = entity.UserId,
                CompanyId = entity.CompanyId,
                LimitCreditUsed = entity.LimitCreditUsed,
                Registered = entity.Registered,
                PriceOfLastPayment = entity.PriceOfLastPayment,
                LastPayment = entity.LastPayment,
            };

            return obj;

        }
        public CreditCardLimitOperation CreditCardLimitOperationUpdateMapper(CreditCardLimitOperationDto dto, CreditCardLimitOperation db)
        {
            if (dto == null) return null;
            if (db == null) return null;

            var creditCardLimitOperation = new CreditCardLimitOperation()
            {
                Id = dto.Id,
                CardId = dto.CardId,
                UserId = dto.UserId,
                CompanyId = dto.CompanyId,
                LimitCreditUsed = dto.LimitCreditUsed,
                PriceOfLastPayment = dto.PriceOfLastPayment,
                LastPayment = dto.LastPayment,
            };

            return creditCardLimitOperation;
        }

    }
}