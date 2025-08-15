using System.Collections.Generic;

using Domain.Entities.Finances.FinancingsLoansExpenses;
using Application.Services.Operations.Finances.Dtos.CategorySubcategoryExpenses;
using Application.Services.Operations.Finances.Dtos.Bank;
using Domain.Entities.Finances.CategorySubcategoryExpenses;
using Application.Services.Operations.Finances.Dtos.FinancingsLoansExpenses;
using Domain.Entities.Finances.Bank;
using Domain.Entities.Finances.CreditCardExpenses;
using Application.Services.Operations.Finances.Dtos.CreditCardExpenses;
using Application.Services.Operations.Finances.Dtos.MonthlyExpenses;
using Domain.Entities.Finances.MonthlyExpenses;
using Application.Services.Operations.Finances.Dtos.YearlyExpenses;
using Domain.Entities.Finances.YearlyExpenses;
using Domain.Entities.Finances.VariablesDebitsExpenses;
using Application.Services.Operations.Finances.Dtos.CashWithdrawnExpenses;
using Application.Services.Operations.Finances.Dtos.PixExpenses;
using Domain.Entities.Finances.PixExpenses;


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

        List<CategoryExpenseDto> CategoryExpensesListMake(List<CategoryExpense> list);
        List<CategoryExpense> CategoryExpensesListMake(List<CategoryExpenseDto> list);
        List<SubcategoryExpenseDto> SubcategoryExpensesListMake(List<SubcategoryExpense> list);
        List<SubcategoryExpense> SubcategoryExpensesListMake(List<SubcategoryExpenseDto> list);
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

        List<MonthlyFixedExpenseDto> MonthlyFixedExpensesListMake(List<MonthlyFixedExpense> list);
        List<MonthlyFixedExpense> MonthlyFixedExpensesListMake(List<MonthlyFixedExpenseDto> list);
        MonthlyFixedExpenseDto MonthlyFixedExpenseMapper(MonthlyFixedExpense entity);
        MonthlyFixedExpense MonthlyFixedExpenseMapper(MonthlyFixedExpenseDto entity);
        MonthlyFixedExpense MonthlyFixedExpenseMapper(MonthlyFixedExpensePaymentDto entity);

        List<YearlyFixedExpenseDto> YearlyFixedExpensesListMake(List<YearlyFixedExpense> list);
        YearlyFixedExpenseDto YearlyFixedExpenseMapper(YearlyFixedExpense entity);
        YearlyFixedExpense YearlyFixedExpenseMapper(YearlyFixedExpenseDto entity);
        YearlyFixedExpense YearlyFixedExpenseMapper(YearlyFixedExpensePaymentDto entity);

        List<CashWithdrawnExpenseDto> CashWithdrawnExpenseListMake(List<CashWithdrawnExpense> list);
        CashWithdrawnExpenseDto CashWithdrawnExpenseMapper(CashWithdrawnExpense entity);
        CashWithdrawnExpense CashWithdrawnExpenseMapper(CashWithdrawnExpenseDto entity);
        CashWithdrawnExpense VariableUpdateMapper(CashWithdrawnExpenseDto dto, CashWithdrawnExpense db);

        List<PixExpenseDto> PixExpensesListMake(List<PixExpense> list);
        List<PixExpense> PixExpensesListMake(List<PixExpenseDto> list);
        PixExpenseDto PixExpensesMapper(PixExpense entity);
        PixExpense PixExpensesMapper(PixExpenseDto entity);
    }
}