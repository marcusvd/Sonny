using System.Collections.Generic;
using Domain.Entities.Finances.FinancingsLoansExpenses;
using Application.Services.Operations.Finances.Dtos.CategorySubcategoryExpenses;
using Application.Services.Operations.Finances.Dtos.Enums;
using Application.Services.Operations.Authentication.Dtos;
using Application.Services.Operations.Main.Companies.Dtos;
using Application.Services.Operations.Finances.Dtos.Bank;
using Application.Services.Operations.Finances.Dtos.PixExpenses;
using Domain.Entities.Main.Companies;
using Domain.Entities.Finances.CategorySubcategoryExpenses;
using Domain.Entities.Finances.Enums;
using Domain.Entities.Authentication;
using Application.Services.Operations.Finances.Dtos.FinancingsLoansExpenses;
using Domain.Entities.Finances.Bank;
using Domain.Entities.Finances.CreditCardExpenses;
using Application.Services.Operations.Finances.Dtos.CreditCardExpenses;
using Application.Services.Shared.Mapper;


namespace Application.Services.Operations.Finances.Dtos
{
    public interface IFinancialObjectMapperServices
    {
        BankAccountDto BankAccountMapper(BankAccount entity);
        BankAccount BankAccountMapper(BankAccountDto entity);
        CardDto CardMapper(Card entity);
        Card CardMapper(CardDto entity);
        CreditCardLimitOperationDto CreditCardLimitOperationMapper(CreditCardLimitOperation entity);
        CreditCardLimitOperation CreditCardLimitOperationMapper(CreditCardLimitOperationDto entity);
        PixDto PixMapper(Pix entity);
        Pix PixMapper(PixDto entity);
        CategoryExpenseDto CategoryExpenseMapper(CategoryExpense entity);
        CategoryExpense CategoryExpenseMapper(CategoryExpenseDto entity);
        SubcategoryExpenseDto SubcategoryExpenseMapper(SubcategoryExpense entity);
        SubcategoryExpense SubcategoryExpenseMapper(SubcategoryExpenseDto entity);
        List<FinancingAndLoanExpenseDto> FinancingAndLoanExpenseListMake(List<FinancingAndLoanExpense> financingAndLoanExpense);
        List<FinancingAndLoanExpenseInstallmentDto> FinancingAndLoanExpenseInstallmentListMake(List<FinancingAndLoanExpenseInstallment> installments);
        FinancingAndLoanExpenseDto FinancingAndLoanExpenseMapper(FinancingAndLoanExpense entity);
        FinancingAndLoanExpense FinancingAndLoanExpenseMapper(FinancingAndLoanExpenseDto entity);
        FinancingAndLoanExpenseInstallmentDto FinancingAndLoanExpenseInstallmentMapper(FinancingAndLoanExpenseInstallment entity);
        FinancingAndLoanExpenseInstallment FinancingAndLoanExpenseInstallmentMapper(FinancingAndLoanExpenseInstallmentDto entity);
        FinancingAndLoanExpenseInstallment InstallmentPayment(FinancingAndLoanExpenseInstallmentPaymentDto dto, FinancingAndLoanExpenseInstallment db);
        CreditCardExpenseDto CreditCardExpenseMapper(CreditCardExpense entity);
        CreditCardExpense CreditCardExpenseMapper(CreditCardExpenseDto entity);
        CreditCardExpenseInvoiceDto CreditCardExpenseInvoiceMapper(CreditCardExpenseInvoice entity);
        CreditCardExpenseInvoice CreditCardExpenseInvoiceMapper(CreditCardExpenseInvoiceDto entity);
    }
}