using FluentValidation;
using Application.Services.Operations.ProductServices.Dtos;
using Application.Services.Operations.Main.Partners.DtoValidation;

namespace Application.Services.Operations.ProductServices.DtoValidation
{
    public class ProductDtoValidator : AbstractValidator<ProductDto>
    {
        public ProductDtoValidator()
        {

            RuleForEach(x => x.Quantities).SetValidator(new QuantityDtoValidator());
            RuleForEach(x => x.Trackings).SetValidator(new TrackingDtoValidator());
        }
    }
}