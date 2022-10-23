using System;

namespace Domain.Entities.Financial
{
    public class InterestCorrection
    {
        public int Id { get; set; }
        public string Reason { get; set; }
        public decimal price { get; set; }
        public DateTime Date { get; set; }
        public int MonthlyOutFlowId {get; set;}
        public MonthlyOutFlow MonthlyOutFlow {get; set;}
    }
}
