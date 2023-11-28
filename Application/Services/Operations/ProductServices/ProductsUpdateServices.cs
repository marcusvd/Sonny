using System.Threading.Tasks;
using AutoMapper;
using UnitOfWork.Persistence.Operations;
using System;
using Application.Exceptions;
using Domain.Entities.StkProduct;
using System.Collections.Generic;
using Application.Services.Operations.ProductServices.Dtos;
using Application.Services.Operations.ProductServices.Helper;
using Application.Services.Operations.ProductServices;
using Microsoft.EntityFrameworkCore;
using System.Linq;

namespace Application.Services.Operations.ProductServices
{
    public class ProductsUpdateServices : IProductsUpdateServices
    {
        private readonly IMapper _MAP;
        private readonly IUnitOfWork _GENERIC_REPO;

        public ProductsUpdateServices(
                         IUnitOfWork GENERIC_REPO,
                         IMapper MAP
                        )
        {
            _MAP = MAP;
            _GENERIC_REPO = GENERIC_REPO;
        }


        public async Task<bool> AutoReserveRemove(int companyId)
        {
            // DateTime sevenDays = DateTime.Now.AddDays(7);

            DateTime minValue = DateTime.MinValue;

            var fromDb = await _GENERIC_REPO.Products.Get(
               predicate => predicate.CompanyId == companyId,
               toInclude => toInclude
               .Include(x => x.Equipament)
               .Include(x => x.Quantities),
               selector => selector
               ).ToListAsync();

            List<Quantity> quantities = new();

            fromDb.ForEach(x =>
                                 {
                                     x.Quantities.ToList().ForEach(xy =>
                                     {
                                         if (xy.IsReserved != minValue)
                                         {
                                             var dateCompare = xy.IsReserved.AddDays(7);

                                             if (DateTime.Now.Date >= dateCompare.Date && xy.SoldDate == minValue)
                                             {
                                                 xy.IsReserved = minValue;
                                                 xy.ReservedOrSoldByUserId = null;
                                                 xy.CustomerId = null;
                                                 quantities.Add(xy);
                                             }
                                         }
                                     });

                                 });

            if (quantities != null)
            {
                _GENERIC_REPO.QuantitiesProduct.UpdateRange(quantities);

                if (await _GENERIC_REPO.save())
                    return true;
            }

            return false;

        }



        // public async Task<ProductDto> UpdateAsync(int productId, ProductDto entityDto)
        // {

        //     if (productId != entityDto.Id)
        //         throw new Exception(GlobalErrorsMessagesException.IdIsDifferentFromEntityUpdate);

        //     // var entity = await _GENERIC_REPO.Products.GetProductByIdByStockIdAsync
        //     //          (x => x.StockId == entityDto.StockId, y => y.Id == entityDto.Id);

        //     var fromDbTraking = await _GENERIC_REPO.Products.GetProductByIdByStockIdTrakingIncludedAsync
        //              (entityDto.StockId, entityDto.Id);

        //     ProductsUpdateHelper productsUpdateHelper = new(_MAP);

        //     entityDto.Quantities = productsUpdateHelper.QuantitiesSetIsReservedSoldDateHelperUpdateAsync(entityDto.Quantities);

        //     entityDto.Trackings = _MAP.Map<List<TrackingDto>>(productsUpdateHelper.TrakingsHelperUpdateAsync(entityDto, fromDbTraking));

        //     var toUpdate = _MAP.Map<Product>(entityDto);

        //     _GENERIC_REPO.Products.Update(toUpdate);

        //     if (await _GENERIC_REPO.save())
        //     {
        //         var entityFromDb = await _GENERIC_REPO.Products.GetById(_id => _id.Id == toUpdate.Id);

        //         if (entityFromDb == null) throw new Exception(GlobalErrorsMessagesException.ObjIsNull);
        //         return _MAP.Map<ProductDto>(entityFromDb);
        //     }

        //     return entityDto;
        // }


    }
}