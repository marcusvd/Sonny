using FluentValidation;
using Services.Dto.CollectsDelivers;

namespace Api.Helpers.Validators.Outsourced
{
    public class CollectDeliveryValidator : AbstractValidator<CollectDeliverDto>
    {
        public CollectDeliveryValidator()
        {
            //EVER
            RuleFor(xx => xx.Subject);
            RuleFor(xx => xx.Start);
            RuleFor(xx => xx.Price);
            RuleFor(xx => xx.Items);
            RuleFor(xx => xx.Comments);



            //CONDITIONAL
            //Transporter
            When(xx => string.IsNullOrEmpty(xx.TransporterNoregisterd), () =>
            {
                RuleFor(xx => xx.TransporterId).NotEmpty().NotNull().GreaterThan(0);
            }).Otherwise(() =>
            {
                RuleFor(xx => xx.TransporterNoregisterd).NotEmpty().NotNull();
            });

            //SOURCE
            RuleFor(xx => xx.SourceCompanyId)
            .NotEmpty().NotNull()
            //if Unless == false above is executed
            .Unless(xx => !xx.SourceCustomerId.Equals(null) || !xx.SourcePartnerId.Equals(null));

            RuleFor(xx => xx.SourceCustomerId)
            .NotEmpty().NotNull()
            //if Unless == false above is executed
            .Unless(xx => !xx.SourceCompanyId.Equals(null) || !xx.SourcePartnerId.Equals(null));


            RuleFor(xx => xx.SourcePartnerId)
            .NotEmpty().NotNull()
            //if Unless == false above is executed
            .Unless(xx => !xx.SourceCompanyId.Equals(null) || !xx.SourceCustomerId.Equals(null));

          



            // When(xx => !string.IsNullOrEmpty(xx.SourceCompanyId.ToString()), () =>
            // {
            //     RuleFor(xx => xx.SourceCustomerId).NotEmpty().NotNull();
            // });

            // RuleFor(xx => xx.SourcePartnerId).NotEmpty().NotNull();
            // RuleFor(xx => xx.SourceCompanyId).NotEmpty().NotNull();
            // RuleFor(xx => xx.SourceNoRegisterName).NotEmpty().NotNull();
            // RuleFor(xx => xx.SourceNoRegisterAddress).NotEmpty().NotNull();

            // When(xx => !string.IsNullOrEmpty(xx.SourceCustomerId.ToString()), () =>
            // {
            //     RuleFor(xx => xx.SourceCustomerId).NotEmpty().NotNull();
            //     //
            //     RuleFor(xx => xx.SourcePartnerId).Empty().Null();
            //     RuleFor(xx => xx.SourceCompanyId).Empty().Null();
            //     RuleFor(xx => xx.SourceNoRegisterName).Empty().Null();
            //     RuleFor(xx => xx.SourceNoRegisterAddress).Empty().Null();
            // });

            //DESTINY

            // SourceCompanyId
            // SourceNoRegisterName
            // SourceNoRegisterAddress

        }
    }
}


