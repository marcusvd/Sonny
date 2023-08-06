using Application.Services.Operations.Products.Dtos;
using FluentValidation;
using System;

namespace Application.Services.Operations.Products.DtoValidation
{
    public class QuantityDtoValidator : AbstractValidator<QuantityDto>
    {
        public QuantityDtoValidator()
        {
            RuleFor(x => x.Sn).NotEmpty().NotNull().MinimumLength(2).MaximumLength(80);
            RuleFor(x => x.NfNumber).NotEmpty().NotNull().MinimumLength(2).MaximumLength(80);
            RuleFor(x => x.EntryDate).NotEmpty().NotNull();
            RuleFor(x => x.WarrantyEnd).NotEmpty().NotNull();
            RuleFor(xx => xx.UsedHistorical).NotEmpty()
                         .NotNull()
                         .When(xx => xx.IsUsed, ApplyConditionTo.AllValidators);

            RuleFor(x => x.IsReserved)
            .Equal(DateTime.MinValue)
            .When(x => x.ReservedByUserId
            .Equals(null), ApplyConditionTo.AllValidators);
            
            RuleFor(x => x.SoldDate)
            .Equal(DateTime.MinValue)
            .When(x => x.CustomerId
            .Equals(null), ApplyConditionTo.AllValidators);

            RuleFor(x => x.ReservedByUserId).NotEmpty()
             .NotNull()
             .GreaterThanOrEqualTo(1)
            .When(x => x.IsReserved != DateTime.MinValue, ApplyConditionTo.AllValidators);
            
            RuleFor(x => x.CustomerId).NotEmpty()
             .NotNull()
             .GreaterThanOrEqualTo(1)
            .When(x => x.IsReserved != DateTime.MinValue, ApplyConditionTo.AllValidators);

            RuleFor(xx => xx.CostPrice).GreaterThanOrEqualTo(0);
            RuleFor(x => x.SoldPrice).GreaterThanOrEqualTo(0);

        }
    }
}