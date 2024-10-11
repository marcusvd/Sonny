using System;
using Domain.Entities.Authentication;
using Domain.Entities.Finances.Bank;

namespace Domain.Entities.Finances.FinancingsLoansExpenses
{
    public class FinancingAndLoanExpenseInstallment 
    {
        public int Id { get; set; }
        public int? UserId { get; set; }
        public MyUser User { get; set; }
        public int? BankAccountId { get; set; }
        public BankAccount BankAccount { get; set; }
        public bool Deleted { get; set; }
        public int? CardId { get; set; }
        public Card Card { get; set; }
        public int? PixId { get; set; }
        public Pix Pix { get; set; }
        public decimal Price { get; set; }
        public decimal Interest { get; set; }
        public DateTime Expires { get; set; }
        public DateTime Registered { get; set; }
        public DateTime WasPaid { get; set; }
        public string OthersPaymentMethods { get; set; }
        public string Document { get; set; }
        public decimal InstallmentPrice { get; set; }
        public decimal PriceWasPaidInstallment { get; set; }
        public string CurrentInstallment { get; set; }
        public int InstallmentsQuantity { get; set; }
        public int FinancingAndLoanExpenseId { get; set; }
        public FinancingAndLoanExpense FinancingAndLoanExpense { get; set; }
    }
}