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

        List<BankAccountDto> BankAccountListMake(List<BankAccount> list);
        List<BankAccount> BankAccountListMake(List<BankAccountDto> list);
        BankAccountDto BankAccountMapper(BankAccount entity);
        BankAccount BankAccountMapper(BankAccountDto entity);
        BankAccount BankAccountUpdateMapper(BankAccountDto dto, BankAccount db);
        List<CardDto> CardListMake(List<Card> list);
        List<Card> CardListMake(List<CardDto> list);
        CardDto CardMapper(Card entity);
        Card CardMapper(CardDto entity);
        CreditCardLimitOperation CreditCardLimitOperationUpdateMapper(CreditCardLimitOperationDto dto, CreditCardLimitOperation db);
        CreditCardLimitOperationDto CreditCardLimitOperationMapper(CreditCardLimitOperation entity);
        CreditCardLimitOperation CreditCardLimitOperationMapper(CreditCardLimitOperationDto entity);
        List<PixDto> PixListMake(List<Pix> list);
        List<Pix> PixListMake(List<PixDto> list);
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
        List<CreditCardExpenseDto> CreditCardExpensesListMake(List<CreditCardExpense> list);
        List<CreditCardExpense> CreditCardExpensesListMake(List<CreditCardExpenseDto> list);
        CreditCardExpenseDto CreditCardExpenseMapper(CreditCardExpense entity);
        CreditCardExpense CreditCardExpenseMapper(CreditCardExpenseDto entity);
        List<CreditCardExpenseInvoiceDto> CreditCardExpensesInvoicesListMake(List<CreditCardExpenseInvoice> list);
        List<CreditCardExpenseInvoice> CreditCardExpensesInvoicesListMake(List<CreditCardExpenseInvoiceDto> list);
        CreditCardExpenseInvoiceDto CreditCardExpenseInvoiceMapper(CreditCardExpenseInvoice entity);
        CreditCardExpenseInvoice CreditCardExpenseInvoiceMapper(CreditCardExpenseInvoiceDto entity);
        
    }
}