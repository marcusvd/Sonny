using System;
using System.Collections.Generic;
using Application.Exceptions;
using Application.Services.Operations.Products.Dtos;
using Domain.Entities.Stocks;

namespace Application.Services.Operations.Products.BusinessRulesValidation
{
    public static class BudgetServiceUpdateBusinessRuleValidation
    {

        // public static void QuantitiesValidation(List<QuantityDto> quantities)
        // {
        //     quantities.ForEach(x =>
        //     {
        //         //Warranty
        //         if (x.WarrantyEnd.Date < x.EntryDate.Date)
        //             throw new ProductApplicationException(ProductErrorsMessagesException.UpdateProductWarrantyEnd1);

        //         if (x.WarrantyEnd.Date > x.EntryDate.Date.AddYears(5))
        //             throw new ProductApplicationException(ProductErrorsMessagesException.UpdateProductWarrantyEnd2);

        //         //Entry Date
        //         if (x.EntryDate.Date == DateTime.MinValue)
        //             throw new ProductApplicationException(ProductErrorsMessagesException.UpdateProductEntryDate1);

        //         if (x.SoldDate.Date > x.EntryDate.Date)
        //             throw new ProductApplicationException(ProductErrorsMessagesException.UpdateProductEntryDate2);
        //     });
        // }
   
    }
}