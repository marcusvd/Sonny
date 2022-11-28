using System;
using System.Collections.Generic;

namespace Services.Dto.Financial
{
    public class EssentialExpenseDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string NameOther { get; set; }
        public string CyclePayment { get; set; }
        public DateTime Expiration { get; set; }
        public string Comments { get; set; }
        public List<EssentialExpenseValueDto> EssentialsExpensesValues { get; set; }
    }
}