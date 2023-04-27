using FluentValidation;
using Application.Dto.Financial;
using Application.Dto.Authentication;
using Application.Services.Helpers.Validators.Shared;

namespace Application.Services.Helpers.Validators.Authentication
{
    public class MyUserValidator : AbstractValidator<MyUserDto>
    {
        public MyUserValidator()
        {
            //Commons
//             RuleFor(xx => xx.UserName).NotEmpty().NotNull().MaximumLength(150);
//             RuleFor(xx => xx.Email).NotEmpty().NotNull().MaximumLength(200);
//            //can't to be make via here
//            //RuleFor(xx => xx.Password).NotEmpty().NotNull().MaximumLength(200);
//             RuleFor(xx => xx.Company.Name).NotEmpty().NotNull().MaximumLength(200);
//  //Childrens
            RuleFor(xxAddress => xxAddress.Address).SetValidator(new AddressValidator());
            RuleFor(xxContact => xxContact.Contact).SetValidator(new ContactValidator());

            
        }
    }
}


