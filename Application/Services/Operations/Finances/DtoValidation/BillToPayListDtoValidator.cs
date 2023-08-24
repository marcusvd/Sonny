
using System;
using System.Collections.Generic;
using Application.Services.Operations.Finances.Dtos.Enums;
using Application.Services.Operations.Main.Companies.Dtos;
using FluentValidation;

namespace Application.Services.Operations.Finances.Dtos
{
    public class BillToPayListDtoValidator : AbstractValidator<FinancialBillToPayListDto>
    {
        public BillToPayListDtoValidator()
        {
            RuleFor(x => x.BillName).NotNull().NotEmpty().MaximumLength(150);
            RuleFor(x => x.Expiration).NotNull().NotEmpty();
            RuleFor(x => x.LinkCopyBill).MaximumLength(500);
            RuleFor(x => x.USERLinkCopyBill).MaximumLength(500);
            RuleFor(x => x.PASSLinkCopyBill).MaximumLength(500);
            RuleFor(x => x.CyclePayment);
        }
    }
}