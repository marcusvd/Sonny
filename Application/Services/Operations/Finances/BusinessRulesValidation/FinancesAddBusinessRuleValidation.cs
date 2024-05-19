using System;
using System.Collections.Generic;
using Application.Services.Operations.Finances.Dtos;
using Application.Services.Operations.Finances.Exceptions;
using Domain.Entities.StkProduct;

namespace Application.Services.Operations.Finances.BusinessRulesValidation
{
    public static class FinancesAddBusinessRulesValidation
    {
        public static void ExpirationGreaterThanCurrentDate(FinancialExpensesDto entityDto)
        {
            if (entityDto.Expiration.Date < DateTime.Now.Date)
                throw new FinancesApplicationException(FinancesErrorsMessagesException.GreaterThanCurrentDate);
        }

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