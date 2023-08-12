
using System;
using System.Collections.Generic;
using Application.Services.Operations.Finances.Dtos.Enums;

namespace Application.Services.Operations.Finances.Dtos
{
    public class FinancialBillToPayListDto
    {
        public int Id { get; set; }
        public string BillName { get; set; }
        public DateTime Expiration { get; set; }
        public CyclePaymentEnumDto CyclePayment { get; set; }
        public string LinkCopyBill { get; set; }
        public string USERLinkCopyBill { get; set; }
        public string PASSLinkCopyBill { get; set; }
        public List<FinancialEssentialCycleDto> EssentialCycles { get; set; }
        public List<FinancialNotPredictableDto> NotPredictables { get; set; }
    }
}