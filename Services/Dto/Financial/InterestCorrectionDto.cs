using System;

namespace Services.Dto.Financial
{
    public class InterestCorrectionDto
    {
        public int Id { get; set; }
        public string Reason { get; set; }
        public decimal price { get; set; }
        public DateTime Date { get; set; }
        public int MonthlyOutFlowId {get; set;}
        public MonthlyOutFlowDto MonthlyOutFlow {get; set;}
    }
}
