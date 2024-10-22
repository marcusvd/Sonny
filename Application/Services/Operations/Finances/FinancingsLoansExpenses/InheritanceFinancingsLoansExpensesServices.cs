using Application.Services.Operations.Finances.CommonForServices;
using Domain.Entities.Finances.FinancingsLoansExpenses;

namespace Application.Services.Operations.Finances.FinancingsLoansExpenses
{
    public abstract class InheritanceFinancingsLoansExpensesServices : InheritanceForFinancialServices
    {
        public FinancingAndLoanExpense FinancingLoansExpensesListMake(FinancingAndLoanExpense financingAndLoanExpense)
        {

            financingAndLoanExpense.FinancingsAndLoansExpensesInstallments = new();

            financingAndLoanExpense.End = financingAndLoanExpense.Start.AddMonths(financingAndLoanExpense.InstallmentsQuantity);

            int currentMonth = 0;

            for (int n = 0; n < financingAndLoanExpense.InstallmentsQuantity; n++)
            {
                currentMonth++;

                financingAndLoanExpense.FinancingsAndLoansExpensesInstallments.Add(MakeFinancingLoansInstallmentsObj(financingAndLoanExpense, currentMonth));
            }

            return financingAndLoanExpense;
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
    }
}
