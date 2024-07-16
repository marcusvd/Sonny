using System;
using System.Collections.Generic;
using Domain.Entities.Finances.Enums;
using Domain.Entities.Main.Companies;

namespace Domain.Entities.Finances
{
    public class YearlyFixedExpenses
    {
        public YearlyFixedExpenses()
        {

        }
        public YearlyFixedExpenses(int companyId,
                                 string nameIdentification,
                                 DateTime expiration,
                                 string linkCopyBill,
                                 string uSERLinkCopyBill,
                                 string pASSLinkCopyBill
                                )
        {
            CompanyId = companyId;
            // Name = name;
            NameIdentification = nameIdentification;
            Expiration = expiration;
            LinkCopyBill = linkCopyBill;
            USERLinkCopyBill = uSERLinkCopyBill;
            PASSLinkCopyBill = pASSLinkCopyBill;
        }
        public int Id { get; set; }
        public int CompanyId { get; set; }
        public Company Company { get; set; }
        // public string Name { get; set; }
        public int NameId {get; set;}
        public YearlyFixedExpensesFillers Name {get; set;}
        public string NameIdentification { get; set; }
        public decimal Price { get; set; }
        public DateTime Start { get; set; }
        public DateTime Expiration { get; set; }
        public DateTime Registered { get; set; }
         public bool AutoRenew { get; set; }
        public string LinkCopyBill { get; set; }
        public string USERLinkCopyBill { get; set; }
        public string PASSLinkCopyBill { get; set; }
        public bool Deleted {get; set;}
        public List<YearlyFixedExpensesTracking> YearlyFixedExpensesTrackings { get; set; }

    }
}