using System.Collections.Generic;
using Domain.Entities.Finances.FinancingsLoansExpenses;
using Application.Services.Operations.Finances.Dtos.CategorySubcategoryExpenses;
using Application.Services.Operations.Finances.Dtos.Enums;
using Application.Services.Operations.Authentication.Dtos;
using Application.Services.Operations.Main.Companies.Dtos;
using Application.Services.Operations.Finances.Dtos.Bank;
using Application.Services.Operations.Finances.Dtos.PixExpenses;


namespace Application.Services.Operations.Finances.Dtos.FinancingsLoansExpenses
{
    public class Fle_ObjectMapperServices : IFle_ObjectMapperServices
    {
        public List<FinancingAndLoanExpenseDto> ExpensesDbToDtoListMake(List<FinancingAndLoanExpense> financingAndLoanExpense)
        {
            var toReturn = new List<FinancingAndLoanExpenseDto>();

            financingAndLoanExpense.ForEach(x =>
            {
                toReturn.Add(ExpenseDbToDto(x));
            });


            return toReturn;
        }
        public FinancingAndLoanExpense ExpenseDtoToDb(FinancingAndLoanExpenseDto entityDto)
        {
            var obj = new FinancingAndLoanExpense()
            {
                Id = entityDto.Id,
                Name = entityDto.Name,
                UserId = entityDto.UserId,
                CompanyId = entityDto.CompanyId,
                CategoryExpenseId = entityDto.CategoryExpenseId,
                SubcategoryExpenseId = entityDto.SubcategoryExpenseId,
                Start = entityDto.Start,
                End = entityDto.End,
                TotalPriceToBePaid = entityDto.TotalPriceToBePaid,
                TotalPriceFinancingOrLoan = entityDto.TotalPriceFinancingOrLoan,
                TotalPriceInterest = entityDto.TotalPriceInterest,
                TotalPercentageInterest = entityDto.TotalPercentageInterest,
                InstallmentsQuantity = entityDto.InstallmentsQuantity,
                InstallmentPrice = entityDto.InstallmentPrice,
                WasPaid = entityDto.WasPaid,
                PaidOff = entityDto.PaidOff,
                Deleted = entityDto.Deleted,
                Registered = entityDto.Registered,
                Description = entityDto.Description,
                LinkCopyBill = entityDto.LinkCopyBill,
                USERLinkCopyBill = entityDto.USERLinkCopyBill,
                PASSLinkCopyBill = entityDto.PASSLinkCopyBill,
            };

            return obj;
        }
        public FinancingAndLoanExpenseDto ExpenseDbToDto(FinancingAndLoanExpense entityDto)
        {

            var installmentListDto = new List<FinancingAndLoanExpenseInstallmentDto>();
            if (entityDto.FinancingsAndLoansExpensesInstallments != null)
                entityDto.FinancingsAndLoansExpensesInstallments.ForEach(x => installmentListDto.Add(InstallmentDbToDto(x)));

            var catExpense = new CategoryExpenseDto();
            if (entityDto.CategoryExpense != null)
            {
                catExpense.Id = entityDto.CategoryExpense.Id;
                catExpense.CompanyId = entityDto.CategoryExpense.CompanyId;
                catExpense.Name = entityDto.CategoryExpense.Name;
            }

            var subcatExpense = new SubcategoryExpenseDto();
            if (entityDto.SubcategoryExpense != null)
            {
                subcatExpense.Id = entityDto.SubcategoryExpense.Id;
                subcatExpense.CategoryExpenseId = entityDto.SubcategoryExpense.CategoryExpenseId;
                subcatExpense.Name = entityDto.SubcategoryExpense.Name;
                subcatExpense.PayCycle = (PayCycleEnumDto)entityDto.SubcategoryExpense.PayCycle;
            }

            var user = new MyUserDto();
            if (entityDto.User != null)
            {
                user.Id = entityDto.User.Id;
                user.CompanyId = entityDto.User.CompanyId;
                user.UserName = entityDto.User.UserName;
                user.Email = entityDto.User.Email;
            }

            var obj = new FinancingAndLoanExpenseDto()
            {
                Id = entityDto.Id,
                Name = entityDto.Name,
                UserId = entityDto.UserId,
                User = user,
                CompanyId = entityDto.CompanyId,
                CategoryExpenseId = entityDto.CategoryExpenseId,
                CategoryExpense = catExpense,
                SubcategoryExpense = subcatExpense,
                SubcategoryExpenseId = entityDto.SubcategoryExpenseId,
                Start = entityDto.Start,
                End = entityDto.End,
                TotalPriceToBePaid = entityDto.TotalPriceToBePaid,
                TotalPriceFinancingOrLoan = entityDto.TotalPriceFinancingOrLoan,
                TotalPriceInterest = entityDto.TotalPriceInterest,
                TotalPercentageInterest = entityDto.TotalPercentageInterest,
                InstallmentsQuantity = entityDto.InstallmentsQuantity,
                InstallmentPrice = entityDto.InstallmentPrice,
                WasPaid = entityDto.WasPaid,
                PaidOff = entityDto.PaidOff,
                Deleted = entityDto.Deleted,
                Registered = entityDto.Registered,
                Description = entityDto.Description,
                FinancingsAndLoansExpensesInstallments = installmentListDto,
                LinkCopyBill = entityDto.LinkCopyBill,
                USERLinkCopyBill = entityDto.USERLinkCopyBill,
                PASSLinkCopyBill = entityDto.PASSLinkCopyBill,
            };

            return obj;
        }
      
        public List<FinancingAndLoanExpenseInstallmentDto> InstallmentsDbToDtoListMake(List<FinancingAndLoanExpenseInstallment> installments)
        {
            var toReturn = new List<FinancingAndLoanExpenseInstallmentDto>();

            installments.ForEach(x =>
            {
                toReturn.Add(InstallmentDbToDto(x));
            });


            return toReturn;
        }
        public FinancingAndLoanExpenseInstallmentDto InstallmentDbToDto(FinancingAndLoanExpenseInstallment entityDto)
        {

            var company = new CompanyDto();
            var user = new MyUserDto();
            var bankAccount = new BankAccountDto();
            var card = new CardDto();
            var financingAndLoanExpense = new FinancingAndLoanExpenseDto();
            var pix = new PixDto();

            if (entityDto.Company != null)
            {
                company.Id = entityDto.Company.Id;
                company.Name = entityDto.Company.Name;
                company.Deleted = entityDto.Company.Deleted;
            }

            if (entityDto.User != null)
            {
                user.Id = entityDto.User.Id;
                user.CompanyId = entityDto.User.CompanyId;
                user.UserName = entityDto.User.UserName;
                user.Email = entityDto.User.Email;
            }

            if (entityDto.BankAccount != null)
            {
                bankAccount.Id = entityDto.BankAccount.Id;
                bankAccount.UserId = entityDto.BankAccount.UserId;
                bankAccount.CompanyId = entityDto.BankAccount.CompanyId;
                bankAccount.Holder = entityDto.BankAccount.Holder;
                bankAccount.Institution = entityDto.BankAccount.Institution;
                bankAccount.Account = entityDto.BankAccount.Account;
                bankAccount.Agency = entityDto.BankAccount.Agency;
                bankAccount.ManagerName = entityDto.BankAccount.ManagerName;
                bankAccount.ManagerContact = entityDto.BankAccount.ManagerContact;
                bankAccount.Balance = entityDto.BankAccount.Balance;
                bankAccount.Deleted = entityDto.BankAccount.Deleted;
                bankAccount.Registered = entityDto.BankAccount.Registered;
                bankAccount.Description = entityDto.BankAccount.Description;
                bankAccount.Type = (TypeAccountEnumDto)entityDto.BankAccount.Type;
            }

            if (entityDto.Card != null)
            {

                card.Id = entityDto.Card.Id;
                card.UserId = entityDto.Card.UserId;
                card.CompanyId = entityDto.Card.CompanyId;
                card.Holder = entityDto.Card.Holder;
                card.Flag = entityDto.Card.Flag;
                card.CreditLimit = entityDto.Card.CreditLimit;
                card.Type = (TypeCardEnumDto)entityDto.Card.Type;
                card.CVC = entityDto.Card.CVC;
                card.Description = entityDto.Card.Description;
                card.Validate = entityDto.Card.Validate;
                card.ClosingDate = entityDto.Card.ClosingDate;
                card.ExpiresDate = entityDto.Card.ExpiresDate;
                card.Deleted = entityDto.Card.Deleted;
                card.Registered = entityDto.Card.Registered;
                card.BankAccountId = entityDto.Card.BankAccountId ?? 0;

                var creditCardLimitOperation = new CreditCardLimitOperationDto();
                if (entityDto.Card.CreditCardLimitOperation != null)
                {
                    if (creditCardLimitOperation != null)
                    {
                        creditCardLimitOperation.CardId = entityDto.Card.CreditCardLimitOperation.CardId;
                        creditCardLimitOperation.UserId = entityDto.Card.CreditCardLimitOperation.UserId;
                        creditCardLimitOperation.CompanyId = entityDto.Card.CreditCardLimitOperation.CompanyId;
                        creditCardLimitOperation.LimitCreditUsed = entityDto.Card.CreditCardLimitOperation.LimitCreditUsed;
                        creditCardLimitOperation.Registered = entityDto.Card.CreditCardLimitOperation.Registered;
                        creditCardLimitOperation.PriceOfLastPayment = entityDto.Card.CreditCardLimitOperation.PriceOfLastPayment;
                        creditCardLimitOperation.LastPayment = entityDto.Card.CreditCardLimitOperation.LastPayment;
                    }
                    card.CreditCardLimitOperation = creditCardLimitOperation;
                }
            }

            if (financingAndLoanExpense != null)
            {
                financingAndLoanExpense.Id = entityDto.FinancingAndLoanExpense.Id;
                financingAndLoanExpense.Name = entityDto.FinancingAndLoanExpense.Name;
                financingAndLoanExpense.UserId = entityDto.FinancingAndLoanExpense.UserId;
                financingAndLoanExpense.CompanyId = entityDto.FinancingAndLoanExpense.CompanyId;
                financingAndLoanExpense.CategoryExpenseId = entityDto.FinancingAndLoanExpense.CategoryExpenseId;
                financingAndLoanExpense.SubcategoryExpenseId = entityDto.FinancingAndLoanExpense.SubcategoryExpenseId;
                financingAndLoanExpense.Start = entityDto.FinancingAndLoanExpense.Start;
                financingAndLoanExpense.End = entityDto.FinancingAndLoanExpense.End;
                financingAndLoanExpense.TotalPriceFinancingOrLoan = entityDto.FinancingAndLoanExpense.TotalPriceFinancingOrLoan;
                financingAndLoanExpense.TotalPriceToBePaid = entityDto.FinancingAndLoanExpense.TotalPriceToBePaid;
                financingAndLoanExpense.TotalPriceInterest = entityDto.FinancingAndLoanExpense.TotalPriceInterest;
                financingAndLoanExpense.TotalPercentageInterest = entityDto.FinancingAndLoanExpense.TotalPercentageInterest;
                financingAndLoanExpense.InstallmentPrice = entityDto.FinancingAndLoanExpense.InstallmentPrice;
                financingAndLoanExpense.InstallmentsQuantity = entityDto.FinancingAndLoanExpense.InstallmentsQuantity;
                financingAndLoanExpense.WasPaid = entityDto.FinancingAndLoanExpense.WasPaid;
                financingAndLoanExpense.PaidOff = entityDto.FinancingAndLoanExpense.PaidOff;
                financingAndLoanExpense.Deleted = entityDto.FinancingAndLoanExpense.Deleted;
                financingAndLoanExpense.Registered = entityDto.FinancingAndLoanExpense.Registered;
                financingAndLoanExpense.Description = entityDto.FinancingAndLoanExpense.Description;
                financingAndLoanExpense.LinkCopyBill = entityDto.FinancingAndLoanExpense.LinkCopyBill;
                financingAndLoanExpense.USERLinkCopyBill = entityDto.FinancingAndLoanExpense.USERLinkCopyBill;
                financingAndLoanExpense.PASSLinkCopyBill = entityDto.FinancingAndLoanExpense.PASSLinkCopyBill;
            }

            if (entityDto.Pix != null)
            {
                pix.Id = entityDto.Pix.Id;
                pix.Key = entityDto.Pix.Key;
                pix.Value = entityDto.Pix.Value;
                pix.Deleted = entityDto.Pix.Deleted;
                pix.BankAccountId = entityDto.Pix.BankAccountId;
            }
           

            var obj = new FinancingAndLoanExpenseInstallmentDto()
            {
                Id = entityDto.Id,
                Company = company,
                CompanyId = entityDto.CompanyId,
                User = user,
                UserId = entityDto.UserId,
                BankAccount = bankAccount,
                BankAccountId = entityDto.BankAccountId,
                Card = card,
                Deleted = entityDto.Deleted,
                CardId = entityDto.CardId,
                PixId = entityDto.PixId,
                Pix = pix,
                Interest = entityDto.Interest,
                Expires = entityDto.Expires,
                Registered = entityDto.Registered,
                WasPaid = entityDto.WasPaid,
                OthersPaymentMethods = entityDto.OthersPaymentMethods,
                Document = entityDto.Document,
                PriceWasPaidInstallment = entityDto.PriceWasPaidInstallment,
                CurrentInstallment = entityDto.CurrentInstallment,
                FinancingAndLoanExpense = financingAndLoanExpense,
                FinancingAndLoanExpenseId = entityDto.FinancingAndLoanExpenseId,
            };

            return obj;
        }
        public FinancingAndLoanExpenseInstallment InstallmentDtoToDb(FinancingAndLoanExpenseInstallmentDto entityDto)
        {
            var obj = new FinancingAndLoanExpenseInstallment()
            {
                Id = entityDto.Id,
                CompanyId = entityDto.CompanyId,
                UserId = entityDto.UserId,
                BankAccountId = entityDto.BankAccountId,
                Deleted = entityDto.Deleted,
                CardId = entityDto.CardId,
                PixId = entityDto.PixId,
                Interest = entityDto.Interest,
                Expires = entityDto.Expires,
                Registered = entityDto.Registered,
                WasPaid = entityDto.WasPaid,
                OthersPaymentMethods = entityDto.OthersPaymentMethods,
                Document = entityDto.Document,
                PriceWasPaidInstallment = entityDto.PriceWasPaidInstallment,
                CurrentInstallment = entityDto.CurrentInstallment,
                FinancingAndLoanExpenseId = entityDto.FinancingAndLoanExpenseId,
            };

            return obj;
        }
        public FinancingAndLoanExpenseInstallment InstallmentPayment(FinancingAndLoanExpenseInstallmentPaymentDto dto,FinancingAndLoanExpenseInstallment db)
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

    }
}