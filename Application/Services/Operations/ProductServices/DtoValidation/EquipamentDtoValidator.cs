using Application.Services.Operations.ProductServices.Dtos;
using FluentValidation;


namespace Application.Services.Operations.ProductServices.DtoValidation
{
    public class EquipamentDtoValidator : AbstractValidator<EquipamentDto>
    {
        public EquipamentDtoValidator()
        {
             RuleFor(x => x.Name).NotEmpty().NotNull().MinimumLength(2).MaximumLength(100);
        }
    }
}