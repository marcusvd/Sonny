using System;
using System.Collections.Generic;
using Domain.Entities.Finances.Inheritance;

namespace Domain.Entities.Finances.YearlyExpenses
{
    public class YearlyFixedExpenses : BaseExpenses
    {
        public YearlyFixedExpenses()
        {

        }
        public YearlyFixedExpenses(int companyId,
                                 string description,
                                 DateTime expires,
                                 string linkCopyBill,
                                 string uSERLinkCopyBill,
                                 string pASSLinkCopyBill
                                )
        {
            CompanyId = companyId;
            // Name = name;
            Description = description;
            Expires = expires;
            LinkCopyBill = linkCopyBill;
            USERLinkCopyBill = uSERLinkCopyBill;
            PASSLinkCopyBill = pASSLinkCopyBill;
        }
        public DateTime Start { get; set; }
        public bool AutoRenew { get; set; }
        public string LinkCopyBill { get; set; }
        public string USERLinkCopyBill { get; set; }
        public string PASSLinkCopyBill { get; set; }
        public List<YearlyFixedExpensesTracking> YearlyFixedExpensesTrackings { get; set; }

    }
}