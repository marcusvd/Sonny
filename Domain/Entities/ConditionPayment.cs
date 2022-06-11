using System;

namespace Domain.Entities
{
    public class ConditionPayment
    {
        public int Id { get; set; }
        public bool Installmented { get; set; }
        public bool CashPayment { get; set; }
        public int QuantityInstallment { get; set; }
        public int PaymentDays { get; set; }


    }
}
