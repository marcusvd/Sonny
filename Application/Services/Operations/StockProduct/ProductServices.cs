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
    public class ProductServices : IProductServices
    {
        private readonly IStockProductObjectMapperServices _IStockProductObjectMapperServices;
        private readonly IUnitOfWork _GENERIC_REPO;

        public ProductServices(
            IUnitOfWork GENERIC_REPO,
            IStockProductObjectMapperServices IStockProductObjectMapperServices
        )
        {
            _GENERIC_REPO = GENERIC_REPO;
            _IStockProductObjectMapperServices = IStockProductObjectMapperServices;
        }

        public async Task<HttpStatusCode> AddProductTypeAsync(ProductTypeDto dtoView)
        {
            if (dtoView == null)
                throw new GlobalServicesException(GlobalErrorsMessagesException.ObjIsNull);

            var entityToDb = _IStockProductObjectMapperServices.ProductTypeMapper(dtoView);

            entityToDb.Registered = DateTime.Now;

            _GENERIC_REPO.ProductTypes.Add(entityToDb);

            if (await _GENERIC_REPO.save())
                return HttpStatusCode.Created;

            throw new GlobalServicesException(GlobalErrorsMessagesException.UnknownError);
        }
        public async Task<List<ProductTypeDto>> GetProductTypesIncludedAsync(int companyId)
        {
            var fromDb = await _GENERIC_REPO
                .ProductTypes.Get(
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

            return _IStockProductObjectMapperServices.ProductTypeListMake(fromDb);
        }
        public async Task<HttpStatusCode> UpdateProductTypeAsync(ProductTypeDto dtoView, int id)
        {
            if (dtoView == null)
                throw new GlobalServicesException(GlobalErrorsMessagesException.ObjIsNull);

            if (dtoView.Id != id)
                throw new GlobalServicesException(GlobalErrorsMessagesException.IdIsDifferentFromEntityUpdate);

            var fromDb = await _GENERIC_REPO.ProductTypes.GetById(
                x => x.Id == id,
                null,
                // toInclude => toInclude.Include(x => x.Segments).ThenInclude(x => x.Manufacturers).ThenInclude(x => x.Models),
                selector => selector
                );

            if (fromDb == null)
                throw new GlobalServicesException(GlobalErrorsMessagesException.ObjIsNull);


            var entityToDb = _IStockProductObjectMapperServices.ProductTypeMapper(dtoView);

            _GENERIC_REPO.ProductTypes.Update(entityToDb);

            if (await _GENERIC_REPO.save())
                return HttpStatusCode.Created;

            throw new GlobalServicesException(GlobalErrorsMessagesException.UnknownError);
        }

        public async Task<List<ProductTypeDto>> GetProductTypesAsync(int companyId)
        {
            var fromDb = await _GENERIC_REPO.ProductTypes.Get(
                predicate =>
                 predicate.CompanyId == companyId,
                 null, selector => selector).ToListAsync();

            if (fromDb == null)
                throw new GlobalServicesException(GlobalErrorsMessagesException.ObjIsNull);


            return _IStockProductObjectMapperServices.ProductTypeListMake(fromDb);
        }
        public async Task<List<SegmentDto>> GetSegmentsAsync(int companyId)
        {
            var fromDb = await _GENERIC_REPO.Segments.Get(
                predicate =>
                 predicate.CompanyId == companyId,
                 null, selector => selector).ToListAsync();

            if (fromDb == null)
                throw new GlobalServicesException(GlobalErrorsMessagesException.ObjIsNull);


            return _IStockProductObjectMapperServices.SegmentListMake(fromDb);
        }
        public async Task<List<ManufacturerDto>> GetManufacturersAsync(int companyId)
        {
            var fromDb = await _GENERIC_REPO.Manufacturers.Get(
                predicate =>
                 predicate.CompanyId == companyId,
                 null, selector => selector).ToListAsync();

            if (fromDb == null)
                throw new GlobalServicesException(GlobalErrorsMessagesException.ObjIsNull);


            return _IStockProductObjectMapperServices.ManufacturerListMake(fromDb);
        }
        public async Task<List<ModelDto>> GetModelsAsync(int companyId)
        {
            var fromDb = await _GENERIC_REPO.Models.Get(
                predicate =>
                 predicate.CompanyId == companyId,
                 null, selector => selector).ToListAsync();

            if (fromDb == null)
                throw new GlobalServicesException(GlobalErrorsMessagesException.ObjIsNull);


            return _IStockProductObjectMapperServices.ModelListMake(fromDb);
        }




        public async Task<HttpStatusCode> AddStock(ProductDto dtoView)
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
        public async Task<HttpStatusCode> UpdatePartial(ProductDto dtoView, int productId)
        {
            if (dtoView == null)
                throw new GlobalServicesException(GlobalErrorsMessagesException.ObjIsNull);


            var fromDb = await _GENERIC_REPO.Products.GetById(
                x => x.Id == dtoView.Id,
                null,
                selector => selector
                );

            // dtoView.Product = _IStockProductObjectMapperServices.ProductMapper(fromDb);

            var entityToDb = _IStockProductObjectMapperServices.ProductMapper(dtoView);



            entityToDb.Registered = DateTime.Now;

            _GENERIC_REPO.Products.Update(entityToDb);

            if (await _GENERIC_REPO.save())
                return HttpStatusCode.Created;

            throw new GlobalServicesException(GlobalErrorsMessagesException.UnknownError);
        }
        public async Task<List<ProductDto>> GetAllStockByCompanyIdAsync(int companyId)
        {
            var fromDb = await _GENERIC_REPO
                .Products.Get(
                    predicate => predicate.CompanyId == companyId,
                    toInclude =>
                        toInclude
                            .Include(x => x.ProductType)
                            .Include(x => x.Segment)
                            .Include(x => x.Manufacturer)
                            .Include(x => x.Model),
                    selector => selector
                )
                .ToListAsync();

            if (fromDb == null)
                throw new Exception(GlobalErrorsMessagesException.ObjIsNull);

            return _IStockProductObjectMapperServices.ProductListMake(fromDb);

        }
    }
}
