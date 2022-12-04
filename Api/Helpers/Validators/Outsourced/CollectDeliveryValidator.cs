using FluentValidation;
using Services.Dto.CollectsDelivers;

namespace Api.Helpers.Validators.Outsourced
{
    public class CollectDeliveryValidator : AbstractValidator<CollectDeliverDto>
    {
        public CollectDeliveryValidator()
        {
            //EVER
            RuleFor(xx => xx.Subject).NotEmpty().NotNull();
            RuleFor(xx => xx.Start).NotEmpty().NotNull();
            RuleFor(xx => xx.Price).NotEmpty().NotNull();
            RuleFor(xx => xx.Items).NotEmpty().NotNull();
            RuleFor(xx => xx.Comments);

            //Transporter
            When(xx => string.IsNullOrEmpty(xx.TransporterNoregisterd), () =>
            {
                RuleFor(xx => xx.TransporterId).NotEmpty().NotNull().GreaterThan(0);
            }).Otherwise(() =>
            {
                RuleFor(xx => xx.TransporterNoregisterd).NotEmpty().NotNull();
            });

            //SOURCE
            //if Unless == false above is executed
            RuleFor(xx => xx.SourceCompanyId)
            .NotEmpty().NotNull()
            .Unless(xx =>
            !xx.SourceCustomerId.Equals(null) || !xx.SourcePartnerId.Equals(null) ||
            !string.IsNullOrEmpty(xx.SourceNoRegisterName) && !string.IsNullOrEmpty(xx.SourceNoRegisterAddress)
            );

            RuleFor(xx => xx.SourceCustomerId)
            .NotEmpty().NotNull()
            .Unless(xx =>
            !xx.SourceCompanyId.Equals(null) || !xx.SourcePartnerId.Equals(null) ||
            !string.IsNullOrEmpty(xx.SourceNoRegisterName) && !string.IsNullOrEmpty(xx.SourceNoRegisterAddress)
            );

            RuleFor(xx => xx.SourcePartnerId)
            .NotEmpty().NotNull()
            .Unless(xx =>
            !xx.SourceCompanyId.Equals(null) || !xx.SourceCustomerId.Equals(null) ||
            !string.IsNullOrEmpty(xx.SourceNoRegisterName) && !string.IsNullOrEmpty(xx.SourceNoRegisterAddress)
            );

            //DESTINY
            //if Unless == false above is executed
            RuleFor(xx => xx.DestinyCompanyId)
            .NotEmpty().NotNull()
            .Unless(xx =>
            !xx.DestinyCustomerId.Equals(null) || !xx.DestinyPartnerId.Equals(null) ||
            !string.IsNullOrEmpty(xx.DestinyNoRegisterName) && !string.IsNullOrEmpty(xx.DestinyNoRegisterAddress)
            );

            RuleFor(xx => xx.DestinyCustomerId)
            .NotEmpty().NotNull()
            .Unless(xx =>
            !xx.DestinyCompanyId.Equals(null) || !xx.DestinyPartnerId.Equals(null) ||
            !string.IsNullOrEmpty(xx.DestinyNoRegisterName) && !string.IsNullOrEmpty(xx.DestinyNoRegisterAddress)
            );

            RuleFor(xx => xx.DestinyPartnerId)
            .NotEmpty().NotNull()
            .Unless(xx =>
            !xx.DestinyCompanyId.Equals(null) || !xx.DestinyCustomerId.Equals(null) ||
            !string.IsNullOrEmpty(xx.DestinyNoRegisterName) && !string.IsNullOrEmpty(xx.DestinyNoRegisterAddress)
            );

        }
    }
}


