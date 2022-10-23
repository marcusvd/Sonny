using System;
using System.Collections.Generic;

namespace Domain.Entities.Financial
{
    public class DailyOutFlow
    {
        public int Id { get; set; }
        public DateTime Today { get; set; }
        public string Name { get; set; }
        public string Amount { get; set; }
        public string PersonOrPlace { get; set; }
        public int TypepaymentId { get; set; }
        public TypePayment Typepayment { get; set; }
        public int CheckingaccountId { get; set; }
        public CheckingAccount Checkingaccount { get; set; }
        public string Description { get; set; }
    }




    
}