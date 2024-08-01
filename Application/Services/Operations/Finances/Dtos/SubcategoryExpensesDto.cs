using System;
using System.Collections.Generic;
using Domain.Entities.Main.Companies;

namespace Application.Services.Operations.Finances.Dtos
{
    public class SubcategoryExpensesDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int CategoryExpensesId { get; set; }
        public CategoryExpensesDto CategoryExpenses { get; set; }
        public List<MonthFixedExpensesDto> MonthFixedExpenses { get; set; }
        public bool Deleted { get; set; }
    }
}
