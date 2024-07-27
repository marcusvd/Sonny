using System;
using System.Collections.Generic;
using Domain.Entities.Finances.Enums;
using Domain.Entities.Main.Companies;

namespace Domain.Entities.Finances
{
    public class MonthFixedExpenses
    {
        public MonthFixedExpenses()
        {

        }
        public MonthFixedExpenses(int companyId,
                                 string description,
                                 DateTime expiration,
                                 string linkCopyBill,
                                 string uSERLinkCopyBill,
                                 string pASSLinkCopyBill
                                )
        {
            CompanyId = companyId;
            // Name = name;
            Description = description;
            Expiration = expiration;
            LinkCopyBill = linkCopyBill;
            USERLinkCopyBill = uSERLinkCopyBill;
            PASSLinkCopyBill = pASSLinkCopyBill;
        }
        public int Id { get; set; }
        public int CompanyId { get; set; }
        public Company Company { get; set; }
        // public string Name { get; set; }
        public int CategoryExpensesId {get; set;}
        public CategoryExpenses CategoryExpenses {get; set;}
        public string Description { get; set; }
        public decimal Price { get; set; }
        public DateTime Expiration { get; set; }
        public DateTime Registered { get; set; }
        public string LinkCopyBill { get; set; }
        public string USERLinkCopyBill { get; set; }
        public string PASSLinkCopyBill { get; set; }
        public bool Deleted {get; set;}
        public List<MonthFixedExpensesTracking> MonthFixedExpensesTrackings { get; set; }

    }
}