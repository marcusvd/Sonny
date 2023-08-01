using FluentValidation;
using Application.Dto.Stocks;

namespace Application.Services.Helpers.Validators
{
    public class EquipamentTypeDtoValidator : AbstractValidator<EquipamentTypeDto>
    {
        public EquipamentTypeDtoValidator()
        {
             RuleFor(x => x.Name).NotEmpty().NotNull().MinimumLength(2).MaximumLength(100);
        }
    }
}