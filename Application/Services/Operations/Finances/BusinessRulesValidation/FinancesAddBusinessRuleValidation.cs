using System;
using System.Collections.Generic;
using Application.Services.Operations.Finances.Dtos.Bank;
using Application.Services.Operations.Finances.Exceptions;

namespace Application.Services.Operations.Finances.BusinessRulesValidation
{
    public static class FinancesAddBusinessRulesValidation
    {
        public static void CardValidateGreaterThanCurrentDate(List<CardDto> entityDto)
        {
            entityDto.ForEach(x =>
            {
                if (x.Validate.Date < DateTime.Now.Date)
                    throw new FinancesApplicationException(FinancesErrorsMessagesException.GreaterThanCurrentDate);
            });
        }
    }
}