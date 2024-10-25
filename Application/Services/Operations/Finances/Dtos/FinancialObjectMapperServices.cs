using System.Collections.Generic;
using Domain.Entities.Finances.FinancingsLoansExpenses;
using Application.Services.Operations.Finances.Dtos.CategorySubcategoryExpenses;
using Application.Services.Operations.Finances.Dtos.Enums;
using Application.Services.Operations.Finances.Dtos.Bank;
using Domain.Entities.Finances.CategorySubcategoryExpenses;
using Domain.Entities.Finances.Enums;
using Application.Services.Operations.Finances.Dtos.FinancingsLoansExpenses;
using Domain.Entities.Finances.Bank;
using Domain.Entities.Finances.CreditCardExpenses;
using Application.Services.Operations.Finances.Dtos.CreditCardExpenses;
using Application.Services.Shared.Mapper;


namespace Application.Services.Operations.Finances.Dtos
{
    public class FinancialObjectMapperServices : CommonObjectMapper, IFinancialObjectMapperServices
    {
        //BankAccount
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
        //Pix
        public List<PixDto> PixListMake(List<Pix> list)
        {
            if (list == null) return null;

            var toReturn = new List<PixDto>();

            list.ForEach(x =>
            {
                toReturn.Add(PixMapper(x));
            });


            return toReturn;
        }
        public List<Pix> PixListMake(List<PixDto> list)
        {
            if (list == null) return null;

            var toReturn = new List<Pix>();

            list.ForEach(x =>
            {
                toReturn.Add(PixMapper(x));
            });


            return toReturn;
        }
        public PixDto PixMapper(Pix entity)
        {
            if (entity == null) return null;

            var obj = new PixDto()
            {
                Id = entity.Id,
                Key = entity.Key,
                Value = entity.Value,
                Deleted = entity.Deleted,
                BankAccountId = entity.BankAccountId,
            };

            return obj;
        }
        public Pix PixMapper(PixDto entity)
        {
            if (entity == null) return null;

            var obj = new Pix()
            {
                Id = entity.Id,
                Key = entity.Key,
                Value = entity.Value,
                Deleted = entity.Deleted,
                BankAccountId = entity.BankAccountId,
            };

            return obj;
        }
        //
        //Financial
        public CategoryExpenseDto CategoryExpenseMapper(CategoryExpense entity)
        {
            if (entity == null) return null;

            var catExpense = new CategoryExpenseDto()
            {
                Id = entity.Id,
                CompanyId = entity.CompanyId,
                Name = entity.Name,
            };
            return catExpense;
        }
        public CategoryExpense CategoryExpenseMapper(CategoryExpenseDto entity)
        {
            if (entity == null) return null;

            var catExpense = new CategoryExpense()
            {
                Id = entity.Id,
                CompanyId = entity.CompanyId,
                Name = entity.Name,
            };
            return catExpense;
        }
        public SubcategoryExpenseDto SubcategoryExpenseMapper(SubcategoryExpense entity)
        {
            if (entity == null) return null;

            var obj = new SubcategoryExpenseDto()
            {
                Id = entity.Id,
                CategoryExpenseId = entity.CategoryExpenseId,
                Name = entity.Name,
                PayCycle = (PayCycleEnumDto)entity.PayCycle,
            };
            return obj;
        }
        public SubcategoryExpense SubcategoryExpenseMapper(SubcategoryExpenseDto entity)
        {
            if (entity == null) return null;

            var subCatExpense = new SubcategoryExpense()
            {
                Id = entity.Id,
                CategoryExpenseId = entity.CategoryExpenseId,
                Name = entity.Name,
                PayCycle = (PayCycleEnum)entity.PayCycle,
            };
            return subCatExpense;
        }
        //
        //FinancingAndLoanExpense
        public List<FinancingAndLoanExpenseDto> FinancingAndLoanExpenseListMake(List<FinancingAndLoanExpense> list)
        {
            if (list == null) return null;

            var toReturn = new List<FinancingAndLoanExpenseDto>();

            list.ForEach(x =>
            {
                toReturn.Add(FinancingAndLoanExpenseMapper(x));
            });


            return toReturn;
        }
        public List<FinancingAndLoanExpenseInstallmentDto> FinancingAndLoanExpenseInstallmentListMake(List<FinancingAndLoanExpenseInstallment> list)
        {
            if (list == null) return null;

            var toReturn = new List<FinancingAndLoanExpenseInstallmentDto>();

            list.ForEach(x =>
            {
                toReturn.Add(FinancingAndLoanExpenseInstallmentMapper(x));

                toReturn.ForEach(xy =>
                {
                    if (x.FinancingAndLoanExpenseId == xy.FinancingAndLoanExpenseId)
                        xy.FinancingAndLoanExpense = FinancingAndLoanExpenseMapper(x.FinancingAndLoanExpense);
                });

            });

            return toReturn;
        }
        public FinancingAndLoanExpenseDto FinancingAndLoanExpenseMapper(FinancingAndLoanExpense entity)
        {
            if (entity == null) return null;

            var obj = new FinancingAndLoanExpenseDto()
            {
                Id = entity.Id,
                Name = entity.Name,
                UserId = entity.UserId,
                CompanyId = entity.CompanyId,
                CategoryExpense = CategoryExpenseMapper(entity.CategoryExpense),
                CategoryExpenseId = entity.CategoryExpenseId,
                SubcategoryExpense = SubcategoryExpenseMapper(entity.SubcategoryExpense),
                SubcategoryExpenseId = entity.SubcategoryExpenseId,
                Start = entity.Start,
                End = entity.End,
                TotalPriceToBePaid = entity.TotalPriceToBePaid,
                TotalPriceFinancingOrLoan = entity.TotalPriceFinancingOrLoan,
                TotalPriceInterest = entity.TotalPriceInterest,
                TotalPercentageInterest = entity.TotalPercentageInterest,
                InstallmentsQuantity = entity.InstallmentsQuantity,
                InstallmentPrice = entity.InstallmentPrice,
                WasPaid = entity.WasPaid,
                PaidOff = entity.PaidOff,
                Deleted = entity.Deleted,
                Registered = entity.Registered,
                Description = entity.Description,
                FinancingsAndLoansExpensesInstallments = new(),
                LinkCopyBill = entity.LinkCopyBill,
                USERLinkCopyBill = entity.USERLinkCopyBill,
                PASSLinkCopyBill = entity.PASSLinkCopyBill,
            };
            return obj;
        }
        public FinancingAndLoanExpense FinancingAndLoanExpenseMapper(FinancingAndLoanExpenseDto entity)
        {
            if (entity == null) return null;
            var obj = new FinancingAndLoanExpense()
            {
                Id = entity.Id,
                Name = entity.Name,
                UserId = entity.UserId,
                CompanyId = entity.CompanyId,
                CategoryExpenseId = entity.CategoryExpenseId,
                SubcategoryExpenseId = entity.SubcategoryExpenseId,
                Start = entity.Start,
                End = entity.End,
                TotalPriceToBePaid = entity.TotalPriceToBePaid,
                TotalPriceFinancingOrLoan = entity.TotalPriceFinancingOrLoan,
                TotalPriceInterest = entity.TotalPriceInterest,
                TotalPercentageInterest = entity.TotalPercentageInterest,
                InstallmentsQuantity = entity.InstallmentsQuantity,
                InstallmentPrice = entity.InstallmentPrice,
                WasPaid = entity.WasPaid,
                PaidOff = entity.PaidOff,
                Deleted = entity.Deleted,
                Registered = entity.Registered,
                Description = entity.Description,
                FinancingsAndLoansExpensesInstallments = new(),
                LinkCopyBill = entity.LinkCopyBill,
                USERLinkCopyBill = entity.USERLinkCopyBill,
                PASSLinkCopyBill = entity.PASSLinkCopyBill,
            };
            return obj;
        }
        public FinancingAndLoanExpenseInstallmentDto FinancingAndLoanExpenseInstallmentMapper(FinancingAndLoanExpenseInstallment entity)
        {
            if (entity == null) return null;

            var obj = new FinancingAndLoanExpenseInstallmentDto()
            {
                Id = entity.Id,
                CompanyId = entity.CompanyId,
                UserId = entity.UserId,
                BankAccountId = entity.BankAccountId,
                Deleted = entity.Deleted,
                CardId = entity.CardId,
                PixId = entity.PixId,
                Interest = entity.Interest,
                Expires = entity.Expires,
                Registered = entity.Registered,
                WasPaid = entity.WasPaid,
                OthersPaymentMethods = entity.OthersPaymentMethods,
                Document = entity.Document,
                PriceWasPaidInstallment = entity.PriceWasPaidInstallment,
                CurrentInstallment = entity.CurrentInstallment,
                FinancingAndLoanExpense = FinancingAndLoanExpenseMapper(entity.FinancingAndLoanExpense),
                FinancingAndLoanExpenseId = entity.FinancingAndLoanExpenseId,
            };

            return obj;

        }
        public FinancingAndLoanExpenseInstallment FinancingAndLoanExpenseInstallmentMapper(FinancingAndLoanExpenseInstallmentDto entity)
        {
            if (entity == null) return null;

            var obj = new FinancingAndLoanExpenseInstallment()
            {
                Id = entity.Id,
                CompanyId = entity.CompanyId,
                UserId = entity.UserId,
                BankAccountId = entity.BankAccountId,
                Deleted = entity.Deleted,
                CardId = entity.CardId,
                PixId = entity.PixId,
                Interest = entity.Interest,
                Expires = entity.Expires,
                Registered = entity.Registered,
                WasPaid = entity.WasPaid,
                OthersPaymentMethods = entity.OthersPaymentMethods,
                Document = entity.Document,
                PriceWasPaidInstallment = entity.PriceWasPaidInstallment,
                CurrentInstallment = entity.CurrentInstallment,
                FinancingAndLoanExpenseId = entity.FinancingAndLoanExpenseId,
            };

            return obj;

        }
        public FinancingAndLoanExpenseInstallment InstallmentPayment(FinancingAndLoanExpenseInstallmentPaymentDto dto, FinancingAndLoanExpenseInstallment db)
        {
            db.Id = dto.Id;
            db.CompanyId = dto.CompanyId;
            db.UserId = dto.UserId;
            db.BankAccountId = dto.BankAccountId;
            db.CardId = dto.CardId;
            db.PixId = dto.PixId;
            db.Interest = dto.Interest;
            db.WasPaid = dto.WasPaid;
            db.OthersPaymentMethods = dto.OthersPaymentMethods;
            db.Document = dto.Document;
            db.PriceWasPaidInstallment = dto.PriceWasPaidInstallment;
            return db;
        }
        //
        //CreditCardExpenses
        public List<CreditCardExpenseDto> CreditCardExpensesListMake(List<CreditCardExpense> list)
        {
            if (list == null) return null;

            var toReturn = new List<CreditCardExpenseDto>();

            list.ForEach(x =>
            {
                toReturn.Add(CreditCardExpenseMapper(x));

                toReturn.ForEach(y =>
                {
                    if (x.CategoryExpenseId == y.CategoryExpenseId)
                        y.CategoryExpense = CategoryExpenseMapper(x.CategoryExpense);

                    if (x.SubcategoryExpenseId == y.SubcategoryExpenseId)
                        y.SubcategoryExpense = SubcategoryExpenseMapper(x.SubcategoryExpense);
                });

            });


            return toReturn;
        }
        public List<CreditCardExpense> CreditCardExpensesListMake(List<CreditCardExpenseDto> list)
        {
            if (list == null) return null;

            var toReturn = new List<CreditCardExpense>();

            list.ForEach(x =>
            {
                toReturn.Add(CreditCardExpenseMapper(x));
            });


            return toReturn;
        }
        public CreditCardExpenseDto CreditCardExpenseMapper(CreditCardExpense entity)
        {
            if (entity == null) return null;

            var obj = new CreditCardExpenseDto()
            {
                Id = entity.Id,
                Name = entity.Name,
                UserId = entity.UserId,
                CompanyId = entity.CompanyId,
                CategoryExpenseId = entity.CategoryExpenseId,
                SubcategoryExpenseId = entity.SubcategoryExpenseId,
                Deleted = entity.Deleted,
                CardId = entity.CardId,
                Price = entity.Price,
                Expires = entity.Expires,
                Registered = entity.Registered,
                WasPaid = entity.WasPaid,
                OthersPaymentMethods = entity.OthersPaymentMethods,
                Document = entity.Document,
                Description = entity.Description,
                InstallmentsQuantity = entity.InstallmentsQuantity,
                InstallmentPrice = entity.InstallmentPrice,
                TotalPriceInterest = entity.TotalPriceInterest,
                TotalPercentageInterest = entity.TotalPercentageInterest,
                PaymentAtSight = entity.PaymentAtSight,
                CurrentInstallment = entity.CurrentInstallment,
                ExpenseDay = entity.ExpenseDay,
                CreditCardExpenseInvoiceId = entity.CreditCardExpenseInvoiceId,
            };

            return obj;
        }
        public CreditCardExpense CreditCardExpenseMapper(CreditCardExpenseDto entity)
        {
            if (entity == null) return null;

            var obj = new CreditCardExpense()
            {
                Id = entity.Id,
                Name = entity.Name,
                UserId = entity.UserId,
                CompanyId = entity.CompanyId,
                CategoryExpenseId = entity.CategoryExpenseId,
                SubcategoryExpenseId = entity.SubcategoryExpenseId,
                Deleted = entity.Deleted,
                CardId = entity.CardId,
                Price = entity.Price,
                Expires = entity.Expires,
                Registered = entity.Registered,
                WasPaid = entity.WasPaid,
                OthersPaymentMethods = entity.OthersPaymentMethods,
                Document = entity.Document,
                Description = entity.Description,
                InstallmentsQuantity = entity.InstallmentsQuantity,
                InstallmentPrice = entity.InstallmentPrice,
                TotalPriceInterest = entity.TotalPriceInterest,
                TotalPercentageInterest = entity.TotalPercentageInterest,
                PaymentAtSight = entity.PaymentAtSight,
                CurrentInstallment = entity.CurrentInstallment,
                ExpenseDay = entity.ExpenseDay,
                CreditCardExpenseInvoiceId = entity.CreditCardExpenseInvoiceId ?? 0,
            };

            return obj;
        }

        public List<CreditCardExpenseInvoiceDto> CreditCardExpensesInvoicesListMake(List<CreditCardExpenseInvoice> list)
        {
            if (list == null) return null;

            var toReturn = new List<CreditCardExpenseInvoiceDto>();

            list.ForEach(x =>
            {
                toReturn.Add(CreditCardExpenseInvoiceMapper(x));
            });


            return toReturn;
        }
        public List<CreditCardExpenseInvoice> CreditCardExpensesInvoicesListMake(List<CreditCardExpenseInvoiceDto> list)
        {
            if (list == null) return null;

            var toReturn = new List<CreditCardExpenseInvoice>();

            list.ForEach(x =>
            {
                toReturn.Add(CreditCardExpenseInvoiceMapper(x));
            });


            return toReturn;
        }
        public CreditCardExpenseInvoiceDto CreditCardExpenseInvoiceMapper(CreditCardExpenseInvoice entity)
        {
            if (entity == null) return null;

            var obj = new CreditCardExpenseInvoiceDto()
            {
                Id = entity.Id,
                UserId = entity.UserId,
                CompanyId = entity.CompanyId,
                CardId = entity.CardId ?? 0,
                PaidFromBankAccountId = entity.PaidFromBankAccountId,
                Price = entity.Price,
                Expires = entity.Expires,
                Interest = entity.Interest,
                ClosingDate = entity.ClosingDate,
                WasPaid = entity.WasPaid,
                OthersPaymentMethods = entity.OthersPaymentMethods,
                Document = entity.Document,
                Description = entity.Description,
                Registered = entity.Registered,
                Deleted = entity.Deleted,
            };

            return obj;
        }
        public CreditCardExpenseInvoice CreditCardExpenseInvoiceMapper(CreditCardExpenseInvoiceDto entity)
        {
            if (entity == null) return null;

            var obj = new CreditCardExpenseInvoice()
            {
                Id = entity.Id,
                UserId = entity.UserId,
                CompanyId = entity.CompanyId,
                CardId = entity.CardId,
                PaidFromBankAccountId = entity.PaidFromBankAccountId,
                Price = entity.Price,
                Expires = entity.Expires,
                Interest = entity.Interest,
                ClosingDate = entity.ClosingDate,
                WasPaid = entity.WasPaid,
                OthersPaymentMethods = entity.OthersPaymentMethods,
                Document = entity.Document,
                Description = entity.Description,
                Registered = entity.Registered,
                Deleted = entity.Deleted,
                CreditCardExpenses = CreditCardExpensesListMake(entity.CreditCardExpenses)
            };

            return obj;
        }


        //




    }
}