using System;
using Domain.Entities.Authentication;
using Domain.Entities.Finances.Bank;
using Domain.Entities.Finances.CategorySubcategoryExpenses;
using Domain.Entities.Main.Companies;

namespace Domain.Entities.Finances.Inheritance
{
    public class BaseExpense

    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public MyUser User { get; set; }
        public int CompanyId { get; set; }
        public Company Company { get; set; }
        public bool Deleted { get; set; }
        public DateTime Registered { get; set; }
        public string LinkCopyBill { get; set; }
        public string USERLinkCopyBill { get; set; }
        public string PASSLinkCopyBill { get; set; }
    }
}