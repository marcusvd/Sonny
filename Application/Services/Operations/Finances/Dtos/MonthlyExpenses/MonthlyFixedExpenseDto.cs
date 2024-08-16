
using System.Collections.Generic;
using Application.Services.Operations.Finances.Dtos.Inheritance;


namespace Application.Services.Operations.Finances.Dtos
{
    public class MonthlyFixedExpenseDto : BaseExpenseDto
    {

        public string LinkCopyBill { get; set; }
        public string USERLinkCopyBill { get; set; }
        public string PASSLinkCopyBill { get; set; }
        public List<MonthlyFixedExpenseTrackingDto> MonthlyFixedExpensesTrackings { get; set; }
    }
}