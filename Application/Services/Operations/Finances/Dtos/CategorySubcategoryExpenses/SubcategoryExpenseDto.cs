using System;
using System.Collections.Generic;
using Application.Services.Operations.Finances.Dtos.Enums;
using Application.Services.Operations.Finances.Dtos.MonthlyExpenses;

namespace Application.Services.Operations.Finances.Dtos.CategorySubcategoryExpenses
{
    public class SubcategoryExpenseDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public PayCycleEnumDto PayCycle {get; set;}
        public int CategoryExpenseId { get; set; }
        public CategoryExpenseDto CategoryExpense { get; set; }
        public List<MonthlyFixedExpenseDto> MonthlyFixedExpenses { get; set; }
        public bool Deleted { get; set; }
    }
}
