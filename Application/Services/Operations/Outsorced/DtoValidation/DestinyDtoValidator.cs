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

            RuleFor(x => x.CustomerId).Empty().Null()
            .When(x => !x.PartnerId.Equals(null)
            ||
            !string.IsNullOrEmpty(x.NoRegisterName)
            && !string.IsNullOrEmpty(x.NoRegisterAddress));

            RuleFor(x => x.PartnerId).Empty().Null()
            .When(x => !x.CustomerId.Equals(null)
            ||
            !string.IsNullOrEmpty(x.NoRegisterName)
            && !string.IsNullOrEmpty(x.NoRegisterAddress));

            RuleFor(x => x.CustomerId).NotEmpty().NotNull()
            .When(x => x.PartnerId.Equals(null) && string.IsNullOrEmpty(x.NoRegisterName) && string.IsNullOrEmpty(x.NoRegisterAddress));

            RuleFor(x => x.PartnerId).NotEmpty().NotNull()
            .When(x => x.CustomerId.Equals(null) && string.IsNullOrEmpty(x.NoRegisterName) && string.IsNullOrEmpty(x.NoRegisterAddress));

            RuleFor(x => x.NoRegisterName).Empty().Null()
            .When(x => !x.PartnerId.Equals(null) || !x.CustomerId.Equals(null));

            RuleFor(x => x.NoRegisterAddress).Empty().Null()
            .When(x => !x.PartnerId.Equals(null) || !x.CustomerId.Equals(null));

            RuleFor(x => x.Price).GreaterThanOrEqualTo(0);

            RuleFor(x => x.Description).MaximumLength(1000);
        }

    }
}
