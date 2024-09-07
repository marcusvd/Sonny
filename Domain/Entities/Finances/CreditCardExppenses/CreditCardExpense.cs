
using System;
using System.Collections.Generic;
using Domain.Entities.Authentication;
using Domain.Entities.Main.Companies;

namespace Domain.Entities.Finances.CreditCardExppenses
{
    public class CreditCardExpense
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public MyUser User { get; set; }
        public int CompanyId { get; set; }
        public Company Company { get; set; }
        public DateTime Registered { get; set; }
        public bool Deleted { get; set; }
        public List<CreditCardExpenseInstallment> CreditCardExpensesInstallments { get; set; }
    }
}
