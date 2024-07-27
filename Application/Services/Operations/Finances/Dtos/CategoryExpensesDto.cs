using System;
using System.Collections.Generic;
using Domain.Entities.Finances.Enums;
using Domain.Entities.Main.Companies;

namespace Application.Services.Operations.Finances.Dtos
{
    public class CategoryExpensesDto
    {
        public int Id { get; set; }
        public string ExpensesName { get; set; }
        public int CompanyId { get; set; }
        public Company Company { get; set; }
        public bool Deleted { get; set; }
        public List<MonthFixedExpensesDto> MonthFixedExpenses { get; set; }
    }
}