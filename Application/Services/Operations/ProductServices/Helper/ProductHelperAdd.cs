using Application.Services.Operations.BenchBudgetService.Dtos.Enums;
using Application.Services.Operations.BenchBudgetService.Dtos;
using Domain.Entities.Main.Inheritances;
using Domain.Entities.StkProduct;
using System.Collections.Generic;
using System.Linq;
using System;

namespace Application.Services.Operations.ProductServices.Helper
{
    public class ProductHelperAdd
    {

        public List<Quantity> SetQuantitiesFields(List<Quantity> quantity)
        {
            quantity.ToList().ForEach(x =>
                      {
                          x.SoldDate = DateTime.MinValue;
                          x.IsReserved = DateTime.MinValue;
                          x.EntryDate = DateTime.Now;
                      });
            return quantity;
        }

    }
}