using System;
using System.Collections.Generic;

namespace Domain.Entities.Financial
{
    public class EssentialExpense
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string NameOther { get; set; }
        public string CyclePayment { get; set; }
        DateTime Expiration { get; set; }
        public string Comments { get; set; }
        public List<EssentialExpenseValue> EssentialsExpensesValues { get; set; }
    }
}