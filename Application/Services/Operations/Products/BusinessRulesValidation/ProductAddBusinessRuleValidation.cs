using System;
using System.Collections.Generic;
using Application.Exceptions;
using Domain.Entities.Stocks;

namespace Application.Services.Operations.Products.BusinessRulesValidation
{
    public static class ProductAddBusinessRulesValidation
    {

        public static void AvailableQuantityAndStatus(int quantity)
        {
            if (quantity <= 0)
                throw new Exception(GlobalErrorsMessagesException.BusinessRulesViolation);
        }
        public static void QuantitiesValidation(List<Quantity> quantities)
        {

             var fifteenAfter = DateTime.Now.Date + new TimeSpan(15,00,00,00);

            quantities.ForEach(x =>
            {
                //Sold
                if (x.SoldDate != DateTime.MinValue)
                    throw new Exception(GlobalErrorsMessagesException.BusinessRulesViolation);
                
                //IsReserved
                if (x.IsReserved != DateTime.MinValue)
                    throw new Exception(GlobalErrorsMessagesException.BusinessRulesViolation);

                //Warranty
                if (x.WarrantyEnd <= x.EntryDate)
                    throw new Exception(GlobalErrorsMessagesException.BusinessRulesViolation);
                
                if (x.WarrantyEnd > DateTime.Now.AddYears(5))
                    throw new Exception(GlobalErrorsMessagesException.BusinessRulesViolation);

                //Entry Date
                if (x.EntryDate == DateTime.MinValue)
                    throw new Exception(GlobalErrorsMessagesException.BusinessRulesViolation);

                if (x.EntryDate < DateTime.Now.Date - new TimeSpan(15,00,00,00))
                    throw new Exception(GlobalErrorsMessagesException.BusinessRulesViolation);
               
                if (x.EntryDate > fifteenAfter.AddDays(1))
                    throw new Exception(GlobalErrorsMessagesException.BusinessRulesViolation);

            });
        }
    }
}