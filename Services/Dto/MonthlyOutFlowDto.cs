using System;

namespace Services.Dto
{
    public class MonthlyOutFlowDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Amount { get; set; }
        public string Institution { get; set; }
        public DateTime Started { get; set; }
        public DateTime Expiration { get; set; }
        public int Installment { get; set; }
        public string Duplicateurl { get; set; }
        public string User { get; set; }
        public string Password { get; set; }
        public string Description { get; set; }
    }
}