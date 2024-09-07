using System;
using System.Collections.Generic;
using Application.Services.Operations.Authentication.Dtos;
using Application.Services.Operations.Finances.Dtos.InheritanceDto;
using Application.Services.Operations.Main.Companies.Dtos;

namespace Application.Services.Operations.Finances.Dtos.CreditCardExpenses
{
    public class CreditCardExpenseDto
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public MyUserDto User { get; set; }
        public int CompanyId { get; set; }
        public CompanyDto Company { get; set; }
        public DateTime Registered { get; set; }
        public bool Deleted { get; set; }
        public List<CreditCardExpenseInstallmentDto> CreditCardExpensesInstallments { get; set; }
    }
}
