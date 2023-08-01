using FluentValidation;
using Application.Dto.Stocks;

namespace Application.Services.Helpers.Validators
{
    public class ManufacturerDtoValidator : AbstractValidator<ManufacturerDto>
    {
        public ManufacturerDtoValidator()
        {
            RuleFor(x=> x.Name).NotEmpty().NotNull().MinimumLength(2).MaximumLength(100);
        }
    }
}