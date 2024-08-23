using System;
using Domain.Entities.Finances.Inheritance;


namespace Domain.Entities.Finances.Inheritance
{
    public class BaseHistoryExpense
    {
        public int Id { get; set; }
        public int IdFinancingAndLoanExpense { get; set; }
        public int UserId { get; set; }
        public int CompanyId { get; set; }
        public int CategoryExpenseId { get; set; }
        public int SubcategoryExpenseId { get; set; }
        public int? BankAccountId { get; set; }
        public bool Deleted { get; set; }
        public int? CardId { get; set; }
        public int? PixId { get; set; }
        public decimal Price { get; set; }
        public decimal Interest { get; set; }
        public DateTime Expires { get; set; }
        public DateTime Changed { get; set; }
        public DateTime WasPaid { get; set; }
        public string OthersPaymentMethods { get; set; }
        public string Documento { get; set; }
        public string Description { get; set; }
        public string LinkCopyBill { get; set; }
        public string USERLinkCopyBill { get; set; }
        public string PASSLinkCopyBill { get; set; }
    }
}