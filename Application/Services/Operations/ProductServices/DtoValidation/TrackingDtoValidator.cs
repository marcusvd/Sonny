using Application.Services.Operations.ProductServices.Dtos;
using FluentValidation;


namespace Application.Services.Operations.ProductServices.DtoValidation
{
    public class TrackingDtoValidator : AbstractValidator<TrackingDto>
    {
        public TrackingDtoValidator()
        {
            RuleFor(x => x.ProductId).NotEmpty().NotNull();
            RuleFor(xx => xx.CostPrice).ScalePrecision(2, 8).NotEmpty().NotNull();
            RuleFor(xx => xx.SoldPrice).ScalePrecision(2, 8).NotEmpty().NotNull();
            RuleFor(x => x.Sn).NotEmpty().NotNull().MinimumLength(2).MaximumLength(80);
            RuleFor(x => x.NfNumber).NotEmpty().NotNull().MinimumLength(2).MaximumLength(80);
            RuleFor(x => x.CustomerId).NotEmpty().NotNull();
            RuleFor(x => x.UserId).NotEmpty().NotNull();
        }
    }
}