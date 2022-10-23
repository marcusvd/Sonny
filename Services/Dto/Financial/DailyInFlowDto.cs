using System;
using System.Collections.Generic;
using Domain.Entities;

namespace Services.Dto.Financial
{
    public class DailyInFlowDto
    {

        public string Today { get; set; }
        public int ClientId { get; set; }
        public ClientDto Client { get; set; }
        public int TypepaymentId { get; set; }
        public TypePaymentDto Typepayment { get; set; }
        public int CheckingaccountId { get; set; }
        public CheckingAccountDto Checkingaccount { get; set; }
        public string Amount { get; set; }
        public string Description { get; set; }

    }
}