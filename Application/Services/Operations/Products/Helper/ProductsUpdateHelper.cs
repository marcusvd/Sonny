using System;
using System.Collections.Generic;
using System.Linq;
using Application.Services.Operations.Products.BusinessRulesValidation;
using Application.Services.Operations.Products.Dtos;
using AutoMapper;
using Domain.Entities.Product;

namespace Application.Services.Operations.Products.Helper
{

    public class ProductsUpdateHelper
    {
        private List<Tracking> trackings = new();

        private readonly IMapper _MAP;
        public ProductsUpdateHelper(IMapper MAP)
        {
            _MAP = MAP;
        }

        public List<QuantityDto> QuantitiesSetIsReservedSoldDateHelperUpdateAsync(List<QuantityDto> quantities)
        {
            quantities.ToList().ForEach(x =>
                                       {
                                           x.IsReserved = x.IsReserved != DateTime.MinValue ? DateTime.Now : DateTime.MinValue;
                                           x.SoldDate = x.SoldDate != DateTime.MinValue ? DateTime.Now : DateTime.MinValue;
                                           ProductUpdateBusinessRuleValidation.QuantitiesValidation(quantities);
                                       });
            return quantities;
        }
        public List<Tracking> TrakingsHelperUpdateAsync(ProductDto entityDto, Product entitiy)
        {
            entityDto.Quantities.ToList().ForEach(x =>
            {
                if (x.SoldDate != DateTime.MinValue)
                {
                    trackings.Add(new Tracking
                    {
                        ProductId = x.ProductId,
                        CostPrice = x.CostPrice,
                        SoldPrice = x.SoldPrice,
                        Sn = x.Sn,
                        NfNumber = x.NfNumber,
                        CustomerId = x.CustomerId,
                        UserId = 1
                    });
                }
            });

            entitiy.Trackings.ToList().ForEach(x =>
                        {
                            trackings.ToList().ForEach(y =>
                                {
                                    if (x.NfNumber == y.NfNumber)
                                    {
                                        if (x.Sn == y.Sn)
                                            trackings.Remove(y);
                                    }
                                });
                        });
            return trackings;
        }
    }
}