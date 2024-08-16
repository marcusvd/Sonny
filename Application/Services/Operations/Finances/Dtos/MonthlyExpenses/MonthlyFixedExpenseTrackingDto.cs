using System;
using System.Collections.Generic;
using Application.Services.Operations.Authentication.Dtos;
using Application.Services.Operations.Finances.Dtos.Bank;
using Application.Services.Operations.Finances.Dtos.Enums;
using Application.Services.Operations.Finances.Dtos.Inheritance;
using Application.Services.Operations.Main.Companies.Dtos;
using Domain.Entities.Main.Companies;

namespace Application.Services.Operations.Finances.Dtos
{
    public class MonthlyFixedExpenseTrackingDto: BaseExpenseTrackingDto
    {

        public int MonthlyFixedExpenseId { get; set; }
        public MonthlyFixedExpenseDto MonthlyFixedExpense { get; set; }
     
    }
}