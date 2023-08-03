using System;
using System.Collections.Generic;
using Application.Exceptions;
using Application.Services.Operations.Products.Dtos;
using Domain.Entities.Stocks;

namespace Application.Services.Operations.Products.BusinessRulesValidation
{
    public static class ProductUpdateBusinessRuleValidation
    {
        public static void QuantitiesValidation(List<QuantityDto> quantities)
        {
            // var fifteenAgo = DateTime.Now.Date - new TimeSpan(15, 00, 00, 00);
            var fifteenAfter = DateTime.Now.Date + new TimeSpan(15, 00, 00, 00);
            quantities.ForEach(x =>
            {
                //RESERVE
                if (x.IsReserved != DateTime.MinValue && x.ReservedByUserId == null)
                    throw new Exception(GlobalErrorsMessagesException.BusinessRulesViolation);

                if (x.IsReserved != DateTime.MinValue && x.CustomerId == null)
                    throw new Exception(GlobalErrorsMessagesException.BusinessRulesViolation);

                if (x.IsReserved != DateTime.MinValue && x.IsReserved < DateTime.Now)
                    throw new Exception(GlobalErrorsMessagesException.BusinessRulesViolation);

                if ((x.IsReserved.Date - DateTime.Now).TotalDays > 8)
                    throw new Exception(GlobalErrorsMessagesException.BusinessRulesViolation);

                //SALE
                if (x.SoldDate != DateTime.MinValue && x.CustomerId == null)
                    throw new Exception(GlobalErrorsMessagesException.BusinessRulesViolation);

                if (x.SoldDate != DateTime.MinValue && x.SoldDate < DateTime.Now.Date)
                    throw new Exception(GlobalErrorsMessagesException.BusinessRulesViolation);

                if ((x.SoldDate != DateTime.MinValue && (x.SoldDate - DateTime.Now.Date).TotalDays > 8))
                    throw new Exception(GlobalErrorsMessagesException.BusinessRulesViolation);

                //Warranty
                if (x.WarrantyEnd <= x.EntryDate)
                    throw new Exception(GlobalErrorsMessagesException.BusinessRulesViolation);

                if (x.WarrantyEnd > DateTime.Now.AddYears(5))
                    throw new Exception(GlobalErrorsMessagesException.BusinessRulesViolation);

                //Entry Date
                if (x.EntryDate == DateTime.MinValue)
                    throw new Exception(GlobalErrorsMessagesException.BusinessRulesViolation);

                if (x.EntryDate < DateTime.Now.Date - new TimeSpan(15, 00, 00, 00))
                    throw new Exception(GlobalErrorsMessagesException.BusinessRulesViolation);

                if (x.EntryDate > fifteenAfter.AddDays(1))
                    throw new Exception(GlobalErrorsMessagesException.BusinessRulesViolation);

            });
        }
    }
}