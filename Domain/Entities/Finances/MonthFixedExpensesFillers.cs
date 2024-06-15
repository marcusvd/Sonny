using System;
using System.Collections.Generic;
using Domain.Entities.Main.Companies;

namespace Domain.Entities.Finances
{
    public class MonthFixedExpensesFillers
    {
        public int Id { get; set; }
        public string ExpensesName { get; set; }
        public int CompanyId { get; set; }
        public Company Company { get; set; }
        public List<MonthFixedExpenses> MonthFixedExpenses { get; set; }
        public bool Deleted { get; set; }
    }
}
 