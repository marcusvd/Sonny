using System;
using System.Collections.Generic;
using Application.Services.Operations.Authentication.Dtos;
using Application.Services.Operations.Finances.Dtos.Enums;
using Application.Services.Operations.Finances.Dtos.Inheritance;
using Application.Services.Operations.Main.Companies.Dtos;
using Domain.Entities.Main.Companies;

namespace Application.Services.Operations.Finances.Dtos
{
    public class YearlyFixedExpenseTrackingDto : BaseExpenseTrackingDto
    {
        public int YearlyFixedExpenseId { get; set; }
        public YearlyFixedExpenseDto YearlyFixedExpense { get; set; }
        public DateTime Start { get; set; }
        public DateTime Expiration { get; set; }
    }
}