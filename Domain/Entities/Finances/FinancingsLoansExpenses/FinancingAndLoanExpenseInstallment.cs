using System;
using Domain.Entities.Authentication;
using Domain.Entities.Finances.Bank;
using Domain.Entities.Main.Companies;
using Domain.Entities.Shared;

namespace Domain.Entities.Finances.FinancingsLoansExpenses
{
    public class FinancingAndLoanExpenseInstallment : RootBase
    {

        public int? BankAccountId { get; set; }
        public BankAccount BankAccount { get; set; }
        public int? CardId { get; set; }
        public Card Card { get; set; }
        public int? PixId { get; set; }
        public Pix Pix { get; set; }
        public decimal Interest { get; set; }
        public DateTime Expires { get; set; }
        public DateTime WasPaid { get; set; }
        public string OthersPaymentMethods { get; set; }
        public string Document { get; set; }
        public decimal PriceWasPaidInstallment { get; set; }
        public string CurrentInstallment { get; set; }
        public int FinancingAndLoanExpenseId { get; set; }
        public FinancingAndLoanExpense FinancingAndLoanExpense { get; set; }
    }
}