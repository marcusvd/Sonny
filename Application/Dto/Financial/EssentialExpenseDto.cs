using System;
using System.Collections.Generic;

namespace Application.Dto.Financial
{
    public class EssentialExpenseDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string CyclePayment { get; set; }
        public DateTime Expiration { get; set; }
        public string Duplicate { get; set; }
        public string User { get; set; }
        public string Password { get; set; }
        public string Comments { get; set; }
        public List<EssentialExpenseValueDto> EssentialsExpensesValues { get; set; }
    }
}