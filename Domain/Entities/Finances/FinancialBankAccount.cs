using System.Collections.Generic;
using Domain.Entities.Finances.Enums;
using Domain.Entities.Main.Companies;

namespace Domain.Entities.Finances
{
    public class FinancialBankAccount
    {
        public FinancialBankAccount()
        {

        }

        public FinancialBankAccount(int companyId, string holder, string institution, string account,
                                    string agency, string managerName, string managerContact, string pix,
                                    decimal balance, TypeAccountEnum type, string description)
        {
            CompanyId = companyId;
            Holder = holder;
            Institution = institution;
            Account = account;
            Agency = agency;
            ManagerName = managerName;
            ManagerContact = managerContact;
            Pix = pix;
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
        public string Pix { get; set; }
        public decimal Balance { get; set; }
        public TypeAccountEnum Type { get; set; }
        public List<FinancialCard> Cards { get; set; } = new List<FinancialCard>();
        public string Description { get; set; }

    }

}