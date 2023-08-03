using Application.Services.Operations.Products.Dtos;
using FluentValidation;


namespace Application.Services.Operations.Products.DtoValidation
{
    public class EquipamentTypeDtoValidator : AbstractValidator<EquipamentTypeDto>
    {
        public EquipamentTypeDtoValidator()
        {
             RuleFor(x => x.Name).NotEmpty().NotNull().MinimumLength(2).MaximumLength(100);
        }
    }
}