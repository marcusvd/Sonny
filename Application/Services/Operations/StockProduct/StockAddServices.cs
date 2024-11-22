using System;
using System.Net;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;
using Application.Exceptions;
using Application.Services.Operations.StockProduct.Dtos.Mappers;

using UnitOfWork.Persistence.Operations;
using Application.Services.Operations.StockProduct.ProductKind;

namespace Application.Services.Operations.StockProduct
{
    public class StockAddServices : IStockAddServices
    {
        private readonly IStockProductObjectMapperServices _IStockProductObjectMapperServices;
        private readonly IUnitOfWork _GENERIC_REPO;

        public StockAddServices(
            IUnitOfWork GENERIC_REPO,
            IStockProductObjectMapperServices IStockProductObjectMapperServices
        )
        {
            _GENERIC_REPO = GENERIC_REPO;
            _IStockProductObjectMapperServices = IStockProductObjectMapperServices;
        }

        public async Task<HttpStatusCode> AddAsync(ProductDto dtoView)
        {
            if (dtoView == null)
                throw new GlobalServicesException(GlobalErrorsMessagesException.ObjIsNull);

            var entityToDb = _IStockProductObjectMapperServices.ProductMapper(dtoView);

            entityToDb.Registered = DateTime.Now;

            _GENERIC_REPO.Products.Add(entityToDb);

            if (await _GENERIC_REPO.save())
                return HttpStatusCode.Created;

            throw new GlobalServicesException(GlobalErrorsMessagesException.UnknownError);
        }
        public async Task<HttpStatusCode> UpdatePartial(StockDto dtoView, int productId)
        {
            if (dtoView == null)
                throw new GlobalServicesException(GlobalErrorsMessagesException.ObjIsNull);


            var fromDb = await _GENERIC_REPO.Products.GetById(
                x => x.Id == dtoView.Product.Id,
                null,
                selector => selector
                );

            dtoView.Product = _IStockProductObjectMapperServices.ProductMapper(fromDb);

            var entityToDb = _IStockProductObjectMapperServices.StockMapper(dtoView);



            entityToDb.Registered = DateTime.Now;

            _GENERIC_REPO.Stocks.Update(entityToDb);

            if (await _GENERIC_REPO.save())
                return HttpStatusCode.Created;

            throw new GlobalServicesException(GlobalErrorsMessagesException.UnknownError);
        }
        // public async Task<List<StockDto>> GetAllProductsByCompanyIdAsync(int companyId)
        // {
        //     var fromDb = await _GENERIC_REPO
        //         .Products.Get(
        //             predicate => predicate.CompanyId == companyId,
        //             toInclude =>
        //                 toInclude
        //                     .Include(x => x.Segments)
        //                     .ThenInclude(x => x.Manufacturers)
        //                     .ThenInclude(x => x.Models),
        //             selector => selector
        //         )
        //         .ToListAsync();

        //     if (fromDb == null)
        //         throw new Exception(GlobalErrorsMessagesException.ObjIsNull);

        //     // return _IStockProductObjectMapperServices.ProductTypeListMake(fromDb);
        //     return null;
        // }
        public async Task<List<ProductDto>> GetAllProductsByCompanyIdAsync(int companyId)
        {
            var fromDb = await _GENERIC_REPO
                .Products.Get(
                    predicate => predicate.CompanyId == companyId,
                    toInclude =>
                        toInclude
                            .Include(x => x.Segments)
                            .ThenInclude(x => x.Manufacturers)
                            .ThenInclude(x => x.Models),
                    selector => selector
                )
                .ToListAsync();

            if (fromDb == null)
                throw new Exception(GlobalErrorsMessagesException.ObjIsNull);

            return _IStockProductObjectMapperServices.ProductListMake(fromDb);
        }


    }
}
