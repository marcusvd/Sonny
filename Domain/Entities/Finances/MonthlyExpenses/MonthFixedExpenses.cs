using System;
using System.Collections.Generic;
using Domain.Entities.Finances.Inheritance;
using Domain.Entities.Main.Companies;

namespace Domain.Entities.Finances.MonthlyExpenses
{
    public class MonthFixedExpenses : BaseExpenses
    {
        public MonthFixedExpenses()
        {

        }
        public MonthFixedExpenses(int companyId,
                                 string description,
                                  DateTime expires,
                                 string linkCopyBill,
                                 string uSERLinkCopyBill,
                                 string pASSLinkCopyBill
                                )
        {
            CompanyId = companyId;
            Description = description;
            Expires = expires;
            LinkCopyBill = linkCopyBill;
            USERLinkCopyBill = uSERLinkCopyBill;
            PASSLinkCopyBill = pASSLinkCopyBill;
        }
        public string LinkCopyBill { get; set; }
        public string USERLinkCopyBill { get; set; }
        public string PASSLinkCopyBill { get; set; }
        public List<MonthFixedExpensesTracking> MonthFixedExpensesTrackings { get; set; }

    }
}