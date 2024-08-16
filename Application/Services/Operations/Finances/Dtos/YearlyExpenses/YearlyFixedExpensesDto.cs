
using System;
using System.Collections.Generic;
using Application.Services.Operations.Finances.Dtos.Enums;
using Application.Services.Operations.Finances.Dtos.Inheritance;
using Application.Services.Operations.Main.Companies.Dtos;

namespace Application.Services.Operations.Finances.Dtos
{
    public class YearlyFixedExpensesDto : BaseExpensesDto
    {
  
        public DateTime Start { get; set; }

        public bool AutoRenew { get; set; }
        public string LinkCopyBill { get; set; }
        public string USERLinkCopyBill { get; set; }
        public string PASSLinkCopyBill { get; set; }
        public List<YearlyFixedExpensesTrackingDto> YearlyFixedExpensesTrackings { get; set; }
    }
}