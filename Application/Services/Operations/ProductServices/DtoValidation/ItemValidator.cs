// namespace Application.Services.Operations.ProductServices.DtoValidation
// {
//     public class ItemValidator
//     {

//     }
// }

using Domain.Entities.Fill.StkProduct;
using FluentValidation;

namespace Application.Services.Operations.ProductServices.DtoValidation
{
    public class ItemValidator : AbstractValidator<Item>
    {
        public ItemValidator()
        {
             RuleFor(x => x.Name).NotEmpty().NotNull().MinimumLength(2).MaximumLength(100);
        }
    }
}