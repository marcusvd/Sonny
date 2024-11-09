using Application.Services.Operations.Outsourced.Dtos;
using FluentValidation;


namespace Application.Services.Helpers.Validators.Outsourced
{
    public class ElectronicRepairValidator : AbstractValidator<ElectronicRepairDto>
    {
        public ElectronicRepairValidator()
        {
            RuleFor(xx => xx.CustomerId).NotEmpty().NotNull();
            RuleFor(xx => xx.ServiceProviderId).NotEmpty().NotNull();
            RuleFor(xx => xx.UserId).NotEmpty().NotNull();;
            RuleFor(xx => xx.Item).NotEmpty().NotNull();
            RuleFor(xx => xx.Description).NotEmpty().NotNull();
            RuleFor(xx => xx.Problem).NotEmpty().NotNull();
            RuleFor(xx => xx.PasswordEquipament).MaximumLength(25);
            RuleFor(xx => xx.UserEquipament).MaximumLength(25);
            RuleFor(xx => xx.SolutionApplied).MaximumLength(500);
            RuleFor(xx => xx.EntryDate);
            RuleFor(xx => xx.Price);
            RuleFor(xx => xx.Status);
        }
    }
}

