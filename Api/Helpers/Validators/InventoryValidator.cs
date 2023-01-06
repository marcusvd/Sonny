using FluentValidation;
using Services.Dto;

namespace Api.Helpers.Validators
{
    public class InventoryValidator : AbstractValidator<InventoryDto>
    {
        public InventoryValidator()
        {
             RuleFor(xx => xx.Cost).NotEmpty().NotNull().ScalePrecision(2, 8).GreaterThanOrEqualTo(1);
             RuleFor(xx => xx.Saleprice).NotEmpty().NotNull().ScalePrecision(2, 8).GreaterThanOrEqualTo(1);
             RuleFor(xx => xx.Equipament).NotEmpty().NotNull().MaximumLength(100);
             RuleFor(xx => xx.IsNew);
             RuleFor(xx => xx.Istested);
             RuleFor(xx => xx.Sold);
             RuleFor(xx => xx.Partner).SetValidator(new PartnerValidator());
             RuleFor(xx => xx.Warranty).NotEmpty().NotNull().GreaterThan(0).LessThanOrEqualTo(1825);
             RuleFor(xx => xx.EntryDate).NotEmpty().NotNull();
             RuleFor(xx => xx.SoldDate);
             RuleFor(xx => xx.Sn).MaximumLength(24);
             RuleFor(xx => xx.Driver).MaximumLength(24);
             RuleFor(xx => xx.Manufacturer).NotEmpty().NotNull().MaximumLength(30);
             RuleFor(xx => xx.Model).NotEmpty().NotNull().MaximumLength(24);
             RuleFor(xx => xx.Generation);
             RuleFor(xx => xx.Capacity).MaximumLength(24);
             RuleFor(xx => xx.Speed).MaximumLength(24);
             RuleFor(xx => xx.Comment).MaximumLength(250);
             RuleFor(xx => xx.Historical).MaximumLength(500);
        }
    }
}