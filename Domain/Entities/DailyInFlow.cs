using System;
using System.Collections.Generic;


namespace Domain.Entities
{
    public class DailyInFlow
    {
        public int Id { get; set; }
        public string Today { get; set; }
        public int ClientId { get; set; }
        public ClientEntity Client { get; set; }
        public int TypepaymentId { get; set; }
        public TypePayment Typepayment { get; set; }
        public int CheckingaccountId { get; set; }
        public CheckingAccount Checkingaccount { get; set; }
        public string Amount { get; set; }
        public string Description { get; set; }
    }
}