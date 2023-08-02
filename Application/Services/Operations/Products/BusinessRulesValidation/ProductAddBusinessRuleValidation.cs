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
            quantities.ForEach(x =>
            {
                if (x.SoldDate != DateTime.MinValue)
                    throw new Exception(GlobalErrorsMessagesException.BusinessRulesViolation);

                if (x.WarrantyEnd <= x.EntryDate)
                    throw new Exception(GlobalErrorsMessagesException.BusinessRulesViolation);

                //Entry Date
                if (x.EntryDate == DateTime.MinValue)
                    throw new Exception(GlobalErrorsMessagesException.BusinessRulesViolation);

                if ((DateTime.Now - x.EntryDate).TotalDays > 15)
                    throw new Exception(GlobalErrorsMessagesException.BusinessRulesViolation);

                if ((DateTime.Now - x.EntryDate).TotalDays > -15)
                    throw new Exception(GlobalErrorsMessagesException.BusinessRulesViolation);
              
            });
        }
    }
}