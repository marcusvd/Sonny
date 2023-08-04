using System;
using System.Collections.Generic;
using Application.Exceptions;
using Domain.Entities.Stocks;

namespace Application.Services.Operations.Products.BusinessRulesValidation
{
    public static class ProductAddBusinessRulesValidation
    {

        public static void AvailableQuantity(int quantity)
        {
            if (quantity <= 0)
                throw new ProductApplicationException(ProductErrorsMessagesException.AvailableQuantity);
        }
        public static void StatusAvailable(StatusEnum status)
        {
            if (status <= StatusEnum.available)
                throw new ProductApplicationException(ProductErrorsMessagesException.ProductStatus);
        }
        public static void QuantitiesValidation(List<Quantity> quantities)
        {

             var fifteenAfter = DateTime.Now.Date + new TimeSpan(15,00,00,00);

            quantities.ForEach(x =>
            {
                //Sold
                if (x.SoldDate != DateTime.MinValue)
                    throw new ProductApplicationException(ProductErrorsMessagesException.AddProductSoldDate);
                
                //IsReserved
                if (x.IsReserved != DateTime.MinValue)
                    throw new ProductApplicationException(ProductErrorsMessagesException.AddProductIsReserved);

                //Warranty
                if (x.WarrantyEnd <= x.EntryDate)
                    throw new ProductApplicationException(ProductErrorsMessagesException.AddProductWarranty);
                
                if (x.WarrantyEnd > DateTime.Now.AddYears(5))
                    throw new ProductApplicationException(ProductErrorsMessagesException.AddProductWarranty);

                //Entry Date
                if (x.EntryDate == DateTime.MinValue)
                    throw new ProductApplicationException(ProductErrorsMessagesException.AddProductEntryDate1);

                if (x.EntryDate < DateTime.Now.Date - new TimeSpan(15,00,00,00))
                    throw new ProductApplicationException(ProductErrorsMessagesException.AddProductEntryDate2);
               
                if (x.EntryDate > fifteenAfter.AddDays(1))
                    throw new ProductApplicationException(ProductErrorsMessagesException.AddProductEntryDate3);

            });
        }
    }
}