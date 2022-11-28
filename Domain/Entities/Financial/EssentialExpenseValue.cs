using System;

namespace Domain.Entities.Financial
{
    public class EssentialExpenseValue
    {
        public int Id { get; set; }
        public decimal Value { get; set; }
        public DateTime Paid { get; set; }
        public string Comments { get; set; }
        public int EssentialExpenseId { get; set; }
        public EssentialExpense EssentialExpense { get; set; }
    }
}