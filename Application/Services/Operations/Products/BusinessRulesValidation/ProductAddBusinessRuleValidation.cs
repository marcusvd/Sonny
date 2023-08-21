using System;
using System.Collections.Generic;
using Application.Services.Operations.Products.Exceptions;
using Domain.Entities.Stocks;

namespace Application.Services.Operations.Products.BusinessRulesValidation
{
    public static class ProductAddBusinessRulesValidation
    {
        public static void QuantitiesValidation(List<Quantity> quantities)
        {
            quantities.ForEach(x =>
            {
                //Warranty
                if (x.WarrantyEnd.Date <= DateTime.Now.Date)
                    throw new ProductApplicationException(ProductErrorsMessagesException.AddProductWarranty);
                
                if (x.WarrantyEnd > DateTime.Now.AddYears(5))
                    throw new ProductApplicationException(ProductErrorsMessagesException.AddProductWarranty);
            });
        }
    }
}