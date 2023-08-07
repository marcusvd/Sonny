using System;
using System.ComponentModel.DataAnnotations.Schema;
using Application.Dto;
using Application.Services.Operations.Outsourced.Dtos;
using Domain.Entities;
using FluentValidation;

namespace Application.Services.Operations.Outsourced.DtoValidation
{
    public class BillingFromDtoValidator : AbstractValidator<BillingFromDto>
    {
        public BillingFromDtoValidator()
        {
            RuleFor(x => x.AmountPrice).GreaterThanOrEqualTo(0);

            RuleFor(x => x.PartnerId).Empty().Null()
            .When(x => !x.CustomerId.Equals(null) || x.Base.Equals(true));

            RuleFor(x => x.CustomerId).Empty().Null()
            .When(x => !x.PartnerId.Equals(null) || x.Base.Equals(true));

            When(x => !x.Base, () =>
            {
                RuleFor(x=>x.CustomerId).NotEmpty().NotNull()
                .When(x=>x.PartnerId.Equals(null));
            });





        }
    }
}
