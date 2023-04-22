using FluentValidation;
using Application.Dto.CollectsDelivers;

namespace Application.Services.Helpers.Validators.Outsourced
{
    public class CollectDeliveryValidator : AbstractValidator<CollectDeliverDto>
    {
        public CollectDeliveryValidator()
        {
            RuleFor(xx => xx.Subject).NotEmpty().NotNull().MaximumLength(137);
            RuleFor(xx => xx.OwnerResponsible).MaximumLength(45);
            RuleFor(xx => xx.Start).NotEmpty().NotNull();
            RuleFor(xx => xx.Price).NotEmpty().NotNull();
            RuleFor(xx => xx.Comments).MaximumLength(500);
            //Transporter
            When(xx => string.IsNullOrEmpty(xx.TransporterNoregisterd), () =>
            {
                RuleFor(xx => xx.TransporterId).NotEmpty().NotNull().GreaterThan(0);
            }).Otherwise(() =>
            {
                RuleFor(xx => xx.TransporterNoregisterd).NotEmpty().NotNull();
            });

            //COLLECT DELIVER BOLEANS
            When(xx => !xx.Collect, () =>
            {
                RuleFor(xx => xx.Deliver).Equal(true);
            }).Otherwise(() =>
            {
                RuleFor(xx => xx.Collect).Equal(true);
            });
            When(xx => !xx.Deliver, () =>
            {
                RuleFor(xx => xx.Collect).Equal(true);
            }).Otherwise(() =>
            {
                RuleFor(xx => xx.Deliver).Equal(true);
            });

            //COLLECT DELIVER
            When(xx => xx.Collect, () =>
            {
                RuleFor(xx => xx.ItemsCollected).NotEmpty().NotNull().MaximumLength(500);
            }).Otherwise(() =>
            {
                RuleFor(xx => xx.ItemsCollected);
            });

            When(xx => xx.Deliver, () =>
            {
                RuleFor(xx => xx.ItemsDelivered).NotEmpty().NotNull().MaximumLength(500);
            }).Otherwise(() =>
            {
                RuleFor(xx => xx.ItemsDelivered);
            });

            //SOURCE
            RuleFor(xx => xx.NoRegisterName).MaximumLength(250);
            RuleFor(xx => xx.NoRegisterAddress).MaximumLength(250);
            
            RuleFor(xx => xx.CompanyId)
            .NotEmpty().NotNull()
            .Unless(xx =>
            !xx.CustomerId.Equals(null) || !xx.PartnerId.Equals(null) ||
            !string.IsNullOrEmpty(xx.NoRegisterName) && !string.IsNullOrEmpty(xx.NoRegisterAddress)
            );

            RuleFor(xx => xx.CustomerId)
            .NotEmpty().NotNull()
            .Unless(xx =>
            !xx.CompanyId.Equals(null) || !xx.PartnerId.Equals(null) ||
            !string.IsNullOrEmpty(xx.NoRegisterName) && !string.IsNullOrEmpty(xx.NoRegisterAddress)
            );

            RuleFor(xx => xx.PartnerId)
            .NotEmpty().NotNull()
            .Unless(xx =>
            !xx.CompanyId.Equals(null) || !xx.CustomerId.Equals(null) ||
            !string.IsNullOrEmpty(xx.NoRegisterName) && !string.IsNullOrEmpty(xx.NoRegisterAddress)
            );
        }

    }
}

