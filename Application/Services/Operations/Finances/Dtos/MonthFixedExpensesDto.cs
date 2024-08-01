
using System;
using System.Collections.Generic;
using Application.Services.Operations.Finances.Dtos.Enums;
using Application.Services.Operations.Main.Companies.Dtos;

namespace Application.Services.Operations.Finances.Dtos
{
    public class MonthFixedExpensesDto
    {
        public int Id { get; set; }
        public int CompanyId { get; set; }
        public CompanyDto Company { get; set; }
        public int UserId { get; set; }
        public int CategoryExpensesId { get; set; }
        public CategoryExpensesDto CategoryExpenses { get; set; }
        public int SubcategoryExpensesId { get; set; }
        public SubcategoryExpensesDto SubcategoryExpenses { get; set; }
        public string Description { get; set; }
        public decimal Price { get; set; }
        public DateTime Expiration { get; set; }
        public DateTime Registered { get; set; }
        public string LinkCopyBill { get; set; }
        public string USERLinkCopyBill { get; set; }
        public string PASSLinkCopyBill { get; set; }
        public bool Deleted { get; set; }
        public List<MonthFixedExpensesTrackingDto> MonthFixedExpensesTrackings { get; set; }
    }
}