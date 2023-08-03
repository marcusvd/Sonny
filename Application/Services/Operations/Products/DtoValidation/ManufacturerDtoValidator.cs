using Application.Services.Operations.Products.Dtos;
using FluentValidation;


namespace Application.Services.Operations.Products.DtoValidation
{
    public class ManufacturerDtoValidator : AbstractValidator<ManufacturerDto>
    {
        public ManufacturerDtoValidator()
        {
            RuleFor(x=> x.Name).NotEmpty().NotNull().MinimumLength(2).MaximumLength(100);
        }
    }
}