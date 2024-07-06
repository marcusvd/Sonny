using System.Collections.Generic;
using Domain.Entities.Finances.Enums;
using Domain.Entities.Main.Companies;

namespace Domain.Entities.Finances
{
    public class BankAccount
    {
        public BankAccount()
        {}

        public BankAccount(int companyId, string holder, string institution, string account,
                                    string agency, string managerName, string managerContact,
                                    decimal balance, TypeAccountEnum type, string description)
        {
            CompanyId = companyId;
            Holder = holder;
            Institution = institution;
            Account = account;
            Agency = agency;
            ManagerName = managerName;
            ManagerContact = managerContact;
            Balance = balance;
            Type = type;
            Description = description;
        }
        public int Id { get; set; }
        public int CompanyId { get; set; }
        public Company Company { get; set; }
        public string Holder { get; set; }
        public string Institution { get; set; }
        public string Account { get; set; }
        public string Agency { get; set; }
        public string ManagerName { get; set; }
        public string ManagerContact { get; set; }
        public bool Deleted { get; set; }
        public decimal Balance { get; set; }
        public TypeAccountEnum Type { get; set; }
        public List<Card> Cards { get; set; } = new List<Card>();
        public List<MonthFixedExpensesTracking> MonthFixedExpensesTrackings { get; set; } = new List<MonthFixedExpensesTracking>();
        public List<YearlyFixedExpensesTracking> YearlyFixedExpensesTrackings { get; set; } = new List<YearlyFixedExpensesTracking>();
        public List<Pix> Pixes { get; set; } = new List<Pix>();
        public string Description { get; set; }

    }

}