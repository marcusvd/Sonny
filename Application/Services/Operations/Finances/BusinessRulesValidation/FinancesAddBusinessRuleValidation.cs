using System;
using System.Collections.Generic;
using Application.Services.Operations.Finances.Dtos;
using Application.Services.Operations.Finances.Exceptions;
using Application.Services.Operations.Products.Exceptions;
using Domain.Entities.Stocks;

namespace Application.Services.Operations.Finances.BusinessRulesValidation
{
    public static class FinancesAddBusinessRulesValidation
    {
        public static void ExpirationGreaterThanCurrentDate(FinancialBillToPayListDto entityDto)
        {
            if (entityDto.Expiration.Date < DateTime.Now.Date)
                throw new FinancesApplicationException(FinancesErrorsMessagesException.GreaterThanCurrentDate);
        }

        public static void CardValidateGreaterThanCurrentDate(List<FinancialCardDto> entityDto)
        {
            entityDto.ForEach(x =>
            {
                if (x.Validate.Date < DateTime.Now.Date)
                    throw new FinancesApplicationException(FinancesErrorsMessagesException.GreaterThanCurrentDate);
            });
        }
    }
}