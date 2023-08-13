
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
            RuleFor(x => x.CyclePayment).NotNull().NotEmpty();
            RuleFor(x => x.LinkCopyBill).NotNull().NotEmpty().MaximumLength(500);
            RuleFor(x => x.USERLinkCopyBill).NotNull().NotEmpty().MaximumLength(500);
            RuleFor(x => x.PASSLinkCopyBill).NotNull().NotEmpty().MaximumLength(500);
        }
    }
}