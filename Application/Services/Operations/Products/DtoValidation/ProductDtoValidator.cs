using FluentValidation;
using Application.Services.Operations.Products.Dtos;
using Application.Services.Operations.Main.Partners.DtoValidation;

namespace Application.Services.Operations.Products.DtoValidation
{
    public class ProductDtoValidator : AbstractValidator<ProductDto>
    {
        public ProductDtoValidator()
        {
            RuleFor(x => x.Name).SetValidator(new EquipamentTypeDtoValidator());
            RuleFor(x => x.Manufacturer).SetValidator(new ManufacturerDtoValidator());
            RuleFor(x => x.Supplier).SetValidator(new PartnerDtoValidator());
            RuleFor(x => x.Model).NotEmpty().NotNull().MinimumLength(2).MaximumLength(100);
            RuleFor(x => x.QuantityReserved).GreaterThanOrEqualTo(0);
            RuleFor(x => x.AvailableQuantity).GreaterThanOrEqualTo(0);
            RuleFor(x => x.Description).NotEmpty().NotNull();
            RuleForEach(x => x.Quantities).SetValidator(new QuantityDtoValidator());
            RuleForEach(x => x.Trackings).SetValidator(new TrackingDtoValidator());
        }
    }
}