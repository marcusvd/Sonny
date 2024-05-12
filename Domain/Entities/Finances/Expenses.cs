using System;
using System.Collections.Generic;
using Domain.Entities.Finances.Enums;
using Domain.Entities.Main.Companies;

namespace Domain.Entities.Finances
{
    public class Expenses
    {
        public Expenses()
        {

        }
        public Expenses(int companyId,
                                 string name,
                                 string nameIdentification,
                                 DateTime expiration,
                                 int numberInstallment,
                                 CyclePaymentEnum cyclePayment,
                                 string linkCopyBill,
                                 string uSERLinkCopyBill,
                                 string pASSLinkCopyBill
                                )
        {
            CompanyId = companyId;
            Name = name;
            NameIdentification = nameIdentification;
            Expiration = expiration;
            NumberInstallment = numberInstallment;
            CyclePayment = cyclePayment;
            LinkCopyBill = linkCopyBill;
            USERLinkCopyBill = uSERLinkCopyBill;
            PASSLinkCopyBill = pASSLinkCopyBill;
        }
        public int Id { get; set; }
        public int CompanyId { get; set; }
        public Company Company { get; set; }
        public string Name { get; set; }
        public string NameIdentification { get; set; }
        public DateTime Expiration { get; set; }
        public int NumberInstallment { get; set; }
        public CyclePaymentEnum CyclePayment { get; set; }
        public string LinkCopyBill { get; set; }
        public string USERLinkCopyBill { get; set; }
        public string PASSLinkCopyBill { get; set; }
        public List<EssentialExpenses> EssentialExpenses { get; set; }

    }
}