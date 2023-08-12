using System;
using System.Collections.Generic;
using Application.Exceptions;
using Domain.Entities.Stocks;

namespace Application.Services.Operations.Main.Partners.BusinessRulesValidation
{
    public static class PartnerAddBusinessRulesValidation
    {

    //     public static void AvailableQuantity(int quantity)
    //     {
    //         if (quantity <= 0)
    //             throw new ProductApplicationException(ProductErrorsMessagesException.AvailableQuantity);
    //     }
    //     public static void StatusAvailable(StatusEnum status)
    //     {
    //         if (status <= StatusEnum.unavailable)
    //             throw new ProductApplicationException(ProductErrorsMessagesException.ProductStatus);
    //     }
    //     public static void QuantitiesValidation(List<Quantity> quantities)
    //     {
    //         quantities.ForEach(x =>
    //         {
    //             //Warranty
    //             if (x.WarrantyEnd <= x.EntryDate)
    //                 throw new ProductApplicationException(ProductErrorsMessagesException.AddProductWarranty);
                
    //             if (x.WarrantyEnd > DateTime.Now.AddYears(5))
    //                 throw new ProductApplicationException(ProductErrorsMessagesException.AddProductWarranty);
    //         });
    //     }
     }
}