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
            RuleFor(x => x.Start).NotEmpty().NotNull();
            RuleFor(x => x.TaskOverView).MaximumLength(1000);
            RuleFor(x => x.BillingFrom).SetValidator(new BillingFromDtoValidator());
            RuleForEach(x => x.Destinies).SetValidator(new DestinyDtoValidator());
            // //Transporter

            // RuleFor(xx => xx.TransporterId).NotEmpty().NotNull().GreaterThan(0);

            // //COLLECT DELIVER BOLEANS
            // When(xx => !xx.Collect, () =>
            // {
            //     RuleFor(xx => xx.Deliver).Equal(true);
            // }).Otherwise(() =>
            // {
            //     RuleFor(xx => xx.Collect).Equal(true);
            // });
            // When(xx => !xx.Deliver, () =>
            // {
            //     RuleFor(xx => xx.Collect).Equal(true);
            // }).Otherwise(() =>
            // {
            //     RuleFor(xx => xx.Deliver).Equal(true);
            // });

            // //COLLECT DELIVER
            // When(xx => xx.Collect, () =>
            // {
            //     RuleFor(xx => xx.ItemsCollected).NotEmpty().NotNull().MaximumLength(500);
            // }).Otherwise(() =>
            // {
            //     RuleFor(xx => xx.ItemsCollected);
            // });

            // When(xx => xx.Deliver, () =>
            // {
            //     RuleFor(xx => xx.ItemsDelivered).NotEmpty().NotNull().MaximumLength(500);
            // }).Otherwise(() =>
            // {
            //     RuleFor(xx => xx.ItemsDelivered);
            // });

            // //SOURCE
            // RuleFor(xx => xx.NoRegisterName).MaximumLength(250);
            // RuleFor(xx => xx.NoRegisterAddress).MaximumLength(250);

            // RuleFor(xx => xx.CompanyId).NotEmpty().NotNull();

            // RuleFor(xx => xx.Customer)
            // .NotEmpty().NotNull()
            // .Unless(xx => !string.IsNullOrEmpty(xx.Partner) ||
            // !string.IsNullOrEmpty(xx.NoRegisterName) && !string.IsNullOrEmpty(xx.NoRegisterAddress)
            // );

            // RuleFor(xx => xx.Partner)
            // .NotEmpty().NotNull()
            // .Unless(xx => !string.IsNullOrEmpty(xx.Customer) ||
            // !string.IsNullOrEmpty(xx.NoRegisterName) && !string.IsNullOrEmpty(xx.NoRegisterAddress)
            // );
        }

    }
}


