using System;
using System.Collections.Generic;
using Application.Dto.Stocks;
using Application.Exceptions;
using Domain.Entities.Stocks;

namespace Application.Services.Operations.Products.BusinessRulesValidation
{
    public static class ProductUpdateBusinessRuleValidation
    {
        public static void QuantitiesValidation(List<QuantityDto> quantities)
        {
            quantities.ForEach(x =>
            {
                //RESERVE
                if (x.IsReserved != DateTime.MinValue && x.ReservedByUserId == null)
                    throw new Exception(GlobalErrorsMessagesException.BusinessRulesViolation);

                if (x.IsReserved != DateTime.MinValue && x.CustomerId == null)
                    throw new Exception(GlobalErrorsMessagesException.BusinessRulesViolation);

                if (x.IsReserved != DateTime.MinValue && x.IsReserved < DateTime.Now)
                    throw new Exception(GlobalErrorsMessagesException.BusinessRulesViolation);

                if ((x.IsReserved != DateTime.MinValue && (x.IsReserved - DateTime.Now).TotalDays > 8))
                    throw new Exception(GlobalErrorsMessagesException.BusinessRulesViolation);

                //SALE
                if (x.SoldDate != DateTime.MinValue && x.CustomerId == null)
                    throw new Exception(GlobalErrorsMessagesException.BusinessRulesViolation);

                if (x.SoldDate != DateTime.MinValue && x.SoldDate < DateTime.Now)
                    throw new Exception(GlobalErrorsMessagesException.BusinessRulesViolation);

                if ((x.SoldDate != DateTime.MinValue && (x.SoldDate - DateTime.Now).TotalDays > 8))
                    throw new Exception(GlobalErrorsMessagesException.BusinessRulesViolation);
            });
        }
    }
}