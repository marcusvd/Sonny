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
            RuleFor(x => x.AmountPrice).GreaterThanOrEqualTo(0).NotEmpty().NotNull();
            
        }
    }
}
