using System;

namespace Services.Dto.Financial
{
    public class EssentialExpenseValueDto
    {
        public int Id { get; set; }
        public decimal Value { get; set; }
        public DateTime Paid { get; set; }
        public string Comments { get; set; }
        public int EssentialExpenseId { get; set; }
        public EssentialExpenseDto EssentialExpense { get; set; }
    }
}