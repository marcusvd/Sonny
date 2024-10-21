using System;
using System.Collections.Generic;
using Application.Services.Operations.Finances.CommonForServices;
using Application.Services.Operations.Finances.Dtos.FinancingsLoansExpenses;
using Application.Services.Operations.Finances.Dtos.MonthlyExpenses;
using Application.Services.Operations.Finances.Dtos.PixExpenses;
using Domain.Entities.Finances.FinancingsLoansExpenses;
using Domain.Entities.Finances.MonthlyExpenses;
using Domain.Entities.Finances.PixExpenses;
using Domain.Entities.Finances.VariablesDebitsExpenses;
using Domain.Entities.Finances.YearlyExpenses;

namespace Application.Services.Operations.Finances.FinancingsLoansExpenses
{
    public abstract class InheritanceFinancingsLoansExpensesServices : InheritanceForFinancialServices
    {

        public FinancingAndLoanExpense FinancingLoansExpensesListMake(FinancingAndLoanExpenseDto financingAndLoanExpense)
        {
            var financingLoanExpense = ObjectMapperFinancingLoanExpenseDtoToDb(financingAndLoanExpense);

            financingLoanExpense.FinancingsAndLoansExpensesInstallments = new();

            financingLoanExpense.End = financingLoanExpense.Start.AddMonths(financingLoanExpense.InstallmentsQuantity);

            int currentMonth = 0;

            for (int n = 0; n < financingLoanExpense.InstallmentsQuantity; n++)
            {
                currentMonth++;

                financingLoanExpense.FinancingsAndLoansExpensesInstallments.Add(MakeFinancingLoansInstallmentsObj(financingLoanExpense, currentMonth));
            }

            return financingLoanExpense;
        }
        private FinancingAndLoanExpense ObjectMapperFinancingLoanExpenseDtoToDb(FinancingAndLoanExpenseDto entityDto)
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
        private FinancingAndLoanExpenseDto ObjectMapperFinancingLoanExpenseDbToDto(FinancingAndLoanExpense entityDto)
        {
            var installmentListDb = entityDto.FinancingsAndLoansExpensesInstallments;
            var installmentListDto = new List<FinancingAndLoanExpenseInstallmentDto>();
            installmentListDb.ForEach(x =>
            {
                installmentListDto.Add(ObjectMapperFinancingLoanExpenseInstallmentDbToDto(x));
            });

            var obj = new FinancingAndLoanExpenseDto()
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
                FinancingsAndLoansExpensesInstallments = installmentListDto,
                LinkCopyBill = entityDto.LinkCopyBill,
                USERLinkCopyBill = entityDto.USERLinkCopyBill,
                PASSLinkCopyBill = entityDto.PASSLinkCopyBill,
            };

            return obj;
        }
        private FinancingAndLoanExpenseInstallment MakeFinancingLoansInstallmentsObj(FinancingAndLoanExpense financingAndLoanExpense, int currentMonth)
        {

            var financingLoanExpense = new FinancingAndLoanExpenseInstallment()
            {
                Id = 0,
                UserId = financingAndLoanExpense.UserId,
                CompanyId = financingAndLoanExpense.CompanyId,
                BankAccountId = null,
                CardId = null,
                PixId = null,
                OthersPaymentMethods = null,
                WasPaid = MinDate,
                Document = null,
                CurrentInstallment = $"{currentMonth}/{financingAndLoanExpense.InstallmentsQuantity}",
                Expires = financingAndLoanExpense.Start.AddMonths(--currentMonth),
                Registered = CurrentDate,
                Interest = 0,
                PriceWasPaidInstallment = 0,
            };

            return financingLoanExpense;
        }


        //   toInclude => toInclude.Include(x => x.CategoryExpense)
        //                  .Include(x => x.FinancingsAndLoansExpensesInstallments)
        //                  .Include(x => x.SubcategoryExpense),
        public List<FinancingAndLoanExpenseDto> FinancingLoansExpensesDtoListMake(List<FinancingAndLoanExpense> financingAndLoanExpense)
        {
            var toReturn = new List<FinancingAndLoanExpenseDto>();
            var installment = new List<FinancingAndLoanExpenseInstallmentDto>();

            financingAndLoanExpense.ForEach(x =>
            {
                toReturn.Add(ObjectMapperFinancingLoanExpenseDbToDto(x));
            });




            return null;
        }

        private FinancingAndLoanExpenseInstallmentDto ObjectMapperFinancingLoanExpenseInstallmentDbToDto(FinancingAndLoanExpenseInstallment entityDto)
        {
            var obj = new FinancingAndLoanExpenseInstallmentDto()
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


    }
}
