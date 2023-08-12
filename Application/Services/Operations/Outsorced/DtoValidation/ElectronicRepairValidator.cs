using Application.Services.Operations.Outsourced.Dtos;
using FluentValidation;


namespace Application.Services.Helpers.Validators.Outsourced
{
    public class ElectronicRepairValidator : AbstractValidator<ElectronicRepairDto>
    {
        public ElectronicRepairValidator()
        {
            RuleFor(xx => xx.CustomerId).NotEmpty().NotNull();
            RuleFor(xx => xx.Item).NotEmpty().NotNull();
            RuleFor(xx => xx.EntryDate).NotEmpty().NotNull();
            RuleFor(xx => xx.Description).NotEmpty().NotNull();
            RuleFor(xx => xx.Problem).NotEmpty().NotNull();
            RuleFor(xx => xx.User);
            RuleFor(xx => xx.Password);
            RuleFor(xx => xx.Price);
            RuleFor(xx => xx.PartnerId).NotEmpty().NotNull();
            RuleFor(xx => xx.solution);
            RuleFor(xx => xx.Authorized);
            RuleFor(xx => xx.Finished);
        }
    }
}

