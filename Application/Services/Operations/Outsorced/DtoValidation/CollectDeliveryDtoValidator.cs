using FluentValidation;
using Application.Services.Operations.Outsourced.Dtos;

namespace Application.Services.Operations.Outsourced.DtoValidation
{
    public class CollectDeliveryDtoValidator : AbstractValidator<CollectDeliverDto>
    {
        public CollectDeliveryDtoValidator()
        {
            RuleFor(x => x.SubjectReason).NotEmpty().NotNull().MaximumLength(150);
            RuleFor(x => x.ContactName).NotEmpty().NotNull().MaximumLength(50);
            // RuleFor(x => x.Start).NotEmpty().NotNull();

            // When(X => !X.Collect && !X.Deliver, () =>
            // {
            //     RuleFor(x => x.Other).NotEqual(false);
                
            // });

            RuleFor(x => x.Price).GreaterThanOrEqualTo(0);
            RuleFor(x => x.TaskOverView).MaximumLength(1000);
            RuleFor(x => x.BillingFrom).SetValidator(new BillingFromDtoValidator());
            RuleFor(x => x.Destiny).SetValidator(new DestinyDtoValidator());
        }

    }
}


