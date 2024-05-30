
using System;
using System.Collections.Generic;
using Application.Services.Operations.Finances.Dtos.Enums;
using Application.Services.Operations.Main.Companies.Dtos;

namespace Application.Services.Operations.Finances.Dtos
{
    public class FixedExpensesDto
    {
        public int Id { get; set; }
        public int CompanyId { get; set; }
        public CompanyDto Company { get; set; }
        public string Name { get; set; }
        public string NameIdentification { get; set; }
        public decimal Price { get; set; }
        public DateTime Expiration { get; set; }
        public DateTime Registered { get; set; }
        // public int NumberInstallment { get; set; }
        public CyclePaymentEnumDto CyclePayment { get; set; }
        public string LinkCopyBill { get; set; }
        public string USERLinkCopyBill { get; set; }
        public string PASSLinkCopyBill { get; set; }
        public List<FixedExpensesTrackingDto> FixedExpensesTrackings { get; set; }
        public List<FinancialExpensesNotPredictableDto> NotPredictables { get; set; }
    }
}