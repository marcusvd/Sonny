using Domain.Entities.Outsourced;
using FluentValidation;
using Services.Dto.CollectsDelivers;

namespace Api.Helpers.Validators.Outsourced
{
    public class EletronicRepairValidator : AbstractValidator<EletronicRepair>
    {
        // public EletronicRepairValidator()
        // {
        //     RuleFor(xx => xx.Item)
        //     RuleFor(xx => xx.EntryDate)
        //     RuleFor(xx => xx.Description)
        //     RuleFor(xx => xx.Problem)
        //     RuleFor(xx => xx.User)
        //     RuleFor(xx => xx.Password)
        //     RuleFor(xx => xx.Price)
        //     RuleFor(xx => xx.PartnerId)
        //     RuleFor(xx => xx.solution)
        //     RuleFor(xx => xx.Authorized)
        //     RuleFor(xx => xx.Finished)
        // }
    }
}

    // customerId: ['', [Validators.required, Validators.maxLength(50)]],
    //   item: ['', [Validators.required, Validators.maxLength(50)]],
    //   entryDate: ['', [Validators.required]],
    //   description:['', [Validators.required,Validators.maxLength(500)]],
    //   problem: ['', [Validators.required, Validators.maxLength(500)]],
    //   user: ['', [Validators.maxLength(50)]],
    //   password: ['', [Validators.minLength(6), Validators.maxLength(50)]],
    //   price: ['', []],
    //   partnerId: ['', [Validators.required]],
    //   solution: ['', [Validators.required, Validators.maxLength(1000)]],
    //   authorized: [false, []],


