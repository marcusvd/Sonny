using System;
using System.ComponentModel.DataAnnotations.Schema;
using Application.Dto;
using Application.Services.Operations.Outsourced.Dtos;
using Domain.Entities;
using FluentValidation;

namespace Application.Services.Operations.Outsourced.DtoValidation
{
    public class DestinyDtoValidator : AbstractValidator<DestinyDto>
    {
        public DestinyDtoValidator()
        {
            RuleFor(x => x.CustomerId).GreaterThanOrEqualTo(1)
            .When(x => x.PartnerId.Equals(null) && string.IsNullOrEmpty(x.NoRegisterName)
            && string.IsNullOrEmpty(x.NoRegisterAddress));

            RuleFor(x => x.CustomerId).GreaterThanOrEqualTo(1)
            .When(x => x.PartnerId.Equals(null) && string.IsNullOrEmpty(x.NoRegisterName)
            && string.IsNullOrEmpty(x.NoRegisterAddress));

            RuleFor(x => x.NoRegisterName).NotEmpty().NotNull().MaximumLength(100)
            .When(x => x.CustomerId.Equals(null) && x.PartnerId.Equals(null));
            
            RuleFor(x => x.NoRegisterAddress).NotEmpty().NotNull().MaximumLength(500)
            .When(x => x.CustomerId.Equals(null) && x.PartnerId.Equals(null));
            
            RuleFor(x => x.Price).GreaterThanOrEqualTo(1);

            RuleFor(x => x.Description).MaximumLength(1000);

        }

    }
}
