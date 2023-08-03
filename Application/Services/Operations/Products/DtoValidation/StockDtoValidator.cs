using Application.Services.Operations.Products.Dtos;
using FluentValidation;

namespace Application.Services.Operations.Products.DtoValidation
{
    public class StockDtoValidator : AbstractValidator<StockDto>
    {
        public StockDtoValidator()
        {
            RuleForEach(x=> x.Products).SetValidator(new ProductDtoValidator());
        }
    }
}