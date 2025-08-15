using System;
using Application.Services.Operations.Finances.Dtos.Bank;
using Application.Services.Operations.Finances.Dtos.CategorySubcategoryExpenses;
using Application.Services.Operations.Finances.Dtos.InheritanceDto;
using Application.Services.Shared.Dtos;

namespace Application.Services.Operations.Finances.Dtos.CashWithdrawnExpenses;

public class CashWithdrawnExpenseDto : RootBaseDto
{
    public string Name { get; set; }
    public int CategoryExpenseId { get; set; }
    public CategoryExpenseDto CategoryExpense { get; set; }
    public int SubcategoryExpenseId { get; set; }
    public SubcategoryExpenseDto SubcategoryExpense { get; set; }
    public int? BankAccountId { get; set; }
    public BankAccountDto BankAccount { get; set; }
    public decimal Price { get; set; }
    public string Document { get; set; }
    public DateTime WithdrawnOn { get; set; }
    public string Description { get; set; }
    public string Place { get; set; }

}