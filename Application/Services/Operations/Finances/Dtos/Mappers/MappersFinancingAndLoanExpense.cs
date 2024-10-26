using System.Collections.Generic;
using Domain.Entities.Finances.FinancingsLoansExpenses;
using Application.Services.Operations.Finances.Dtos.FinancingsLoansExpenses;
using Application.Services.Shared.Mapper;

namespace Application.Services.Operations.Finances.Dtos.Mappers
{
    public partial class FinancialObjectMapperServices : CommonObjectMapper, IFinancialObjectMapperServices
    {
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
    }
}