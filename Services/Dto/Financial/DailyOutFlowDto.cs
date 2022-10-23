using System;
using System.Collections.Generic;

namespace Services.Dto.Financial
{
    public class DailyOutFlowDto
    {
        public int Id { get; set; }
        public DateTime Today { get; set; }
        public string Name { get; set; }
        public string Amount { get; set; }
         public string PersonOrPlace { get; set; }
        public int TypepaymentId { get; set; }
        public TypePaymentDto Typepayment { get; set; }
        public int CheckingaccountId { get; set; }
        public CheckingAccountDto Checkingaccount { get; set; }
        public string Description { get; set; }

    }
}