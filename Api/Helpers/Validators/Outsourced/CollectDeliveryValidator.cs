using Api.Entities.Shared.Validators;
using FluentValidation;
using Services.Dto;
using Services.Dto.CollectsDelivers;

namespace Api.Helpers.Validators
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
       

            RuleFor(xx => xx.SourceCustomerId);
            RuleFor(xx => xx.SourceCustomer);
            RuleFor(xx => xx.SourcePartnerId);
            RuleFor(xx => xx.SourcePartner);
            RuleFor(xx => xx.SourceCompanyId);
            RuleFor(xx => xx.SourceCompany);
            RuleFor(xx => xx.SourceNoRegisterName);
            RuleFor(xx => xx.SourceNoRegisterAddress);


            RuleFor(xx => xx.DestinyCustomerId);
            RuleFor(xx => xx.DestinyCustomer);
            RuleFor(xx => xx.DestinyPartnerId);
            RuleFor(xx => xx.DestinyPartner);
            RuleFor(xx => xx.DestinyCompanyId);
            RuleFor(xx => xx.DestinyCompany);
            RuleFor(xx => xx.DestinyNoRegisterName);
            RuleFor(xx => xx.DestinyNoRegisterAddress);








        }
    }
}


