using FluentValidation;
using Application.Dto.Stocks;

namespace Application.Services.Helpers.Validators
{
    public class StockDtoValidator : AbstractValidator<StockDto>
    {
        public StockDtoValidator()
        {
            RuleForEach(x=> x.Products).SetValidator(new ProductDtoValidator());
        }
    }
}