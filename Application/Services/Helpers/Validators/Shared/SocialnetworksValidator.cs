using FluentValidation;
using Application.Dto;

namespace Application.Services.Helpers.Validators.Shared
{
    public class SocialnetworksValidator : AbstractValidator<SocialNetworkDto>
    {
        public SocialnetworksValidator()
        {
            RuleFor(xx => xx.Name).NotNull().NotEmpty().MaximumLength(150);
            RuleFor(xx => xx.Url).NotNull().NotEmpty().MaximumLength(150);
        }
    }
}