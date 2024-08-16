
using System;
using System.Collections.Generic;
using Application.Services.Operations.Finances.Dtos.Enums;
using Application.Services.Operations.Finances.Dtos.Inheritance;
using Application.Services.Operations.Main.Companies.Dtos;

namespace Application.Services.Operations.Finances.Dtos
{
    public class YearlyFixedExpenseDto : BaseExpenseDto
    {
  
        public DateTime Start { get; set; }

        public bool AutoRenew { get; set; }
        public string LinkCopyBill { get; set; }
        public string USERLinkCopyBill { get; set; }
        public string PASSLinkCopyBill { get; set; }
        public List<YearlyFixedExpenseTrackingDto> YearlyFixedExpensesTrackings { get; set; }
    }
}