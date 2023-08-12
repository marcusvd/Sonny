using System;
using System.Collections.Generic;
using Domain.Entities.Finances.Enums;

namespace Domain.Entities.Finances
{
    public class FinancialBillToPayList
    {
        public int Id { get; set; }
        public string BillName { get; set; }
        public DateTime Expiration { get; set; }
        public CyclePaymentEnum CyclePayment { get; set; }
        public string LinkCopyBill { get; set; }
        public string USERLinkCopyBill { get; set; }
        public string PASSLinkCopyBill { get; set; }
        public List<FinancialEssentialCycle> EssentialCycles { get; set; }
        public List<FinancialNotPredictable> NotPredictables { get; set; }
    }
}