using System;
using System.Collections.Generic;

namespace Domain.Entities.Financial
{
    public class VariableMonthlyOutput
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public decimal Amount { get; set; }
        public string Institution { get; set; }
        public DateTime Expiration { get; set; }
        public string Duplicateurl { get; set; }
        public string User { get; set; }
        public string Password { get; set; }
        public string Comments { get; set; }
    }
}