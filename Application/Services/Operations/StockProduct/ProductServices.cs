using System;
using System.Net;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;
using Application.Exceptions;
using Application.Services.Operations.StockProduct.Dtos.Mappers;

using UnitOfWork.Persistence.Operations;
using Application.Services.Operations.StockProduct.ProductKind;
using System.Linq;
using Application.Services.Operations.StockProduct.Helpers;


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
                    predicate => predicate.CompanyId == companyId && predicate.Deleted == DateTime.MinValue,
                    toInclude =>
                        toInclude
                            .Include(x => x.Segments.Where(x => x.Deleted == DateTime.MinValue))
                            .ThenInclude(x => x.Manufacturers.Where(x => x.Deleted == DateTime.MinValue))
                            .ThenInclude(x => x.Models.Where(x => x.Deleted == DateTime.MinValue))
                            .ThenInclude(x => x.Specificities),
                    selector => selector
                )
                .ToListAsync();

            if (fromDb == null)
                throw new Exception(GlobalErrorsMessagesException.ObjIsNull);

            return _IStockProductObjectMapperServices.ProductTypeListMake(fromDb);
        }
        public async Task<ProductTypeDto> GetProductTypesByIdIncludedAsync(int productTypeId)
        {

            var fromDb = await _GENERIC_REPO
                .ProductTypes.GetById(
                    predicate => predicate.Id == productTypeId && predicate.Deleted == DateTime.MinValue,
                    toInclude =>
                        toInclude
                            .Include(x => x.Segments.Where(x => x.Deleted == DateTime.MinValue))
                            .ThenInclude(x => x.Manufacturers.Where(x => x.Deleted == DateTime.MinValue))
                            .ThenInclude(x => x.Models.Where(x => x.Deleted == DateTime.MinValue))
                            .ThenInclude(x => x.Specificities),
                    selector => selector
                );

            if (fromDb == null)
                throw new Exception(GlobalErrorsMessagesException.ObjIsNull);

            return _IStockProductObjectMapperServices.ProductTypeMapper(fromDb);
        }
        public async Task<EditChildrenProductType> UpdateProductTypeAsync(ProductTypeDto dtoView, int id)
        {
            var helper = new UpdateProductTypeHelperService();

            helper.ValidateDto(dtoView, id);

            var existingProduct = await helper.GetProductTypeById(id, _GENERIC_REPO);

            if (existingProduct == null)
                throw new GlobalServicesException(GlobalErrorsMessagesException.ObjIsNull);

            var entityToUpdate = _IStockProductObjectMapperServices.ProductTypeMapper(dtoView);

            helper.MarkSegmentsAsDeleted(entityToUpdate);

            _GENERIC_REPO.ProductTypes.Update(entityToUpdate);

            if (!await _GENERIC_REPO.save())
                throw new GlobalServicesException(GlobalErrorsMessagesException.UnknownError);

            var updatedProduct = await helper.GetUpdatedProduct(id, _GENERIC_REPO);

            return helper.MapToEditChildrenProductType(dtoView, updatedProduct);
        }


        public async Task<HttpStatusCode> UpdateProductTypeRangeAsync(List<ProductTypeDto> dtoView)
        {
            if (dtoView == null)
                throw new GlobalServicesException(GlobalErrorsMessagesException.ObjIsNull);

            var fromDb = await _GENERIC_REPO.ProductTypes.Get(
                predicate => predicate.CompanyId == dtoView[0].CompanyId && predicate.Deleted == DateTime.MinValue,
                toInclude => toInclude.Include(x => x.Segments).ThenInclude(x => x.Manufacturers).ThenInclude(x => x.Models),
                selector => selector
                ).ToListAsync();

            var entityToDb = _IStockProductObjectMapperServices.ProductTypeUpdateListMake(dtoView, fromDb);

            entityToDb.ForEach(x =>
            {
                if (x.Deleted != DateTime.MinValue)
                {
                    x.Deleted = DateTime.Now;

                    x.Segments.ForEach(y =>
                    {
                        y.Deleted = DateTime.Now;

                        y.Manufacturers.ForEach(xy =>
                        {
                            xy.Deleted = DateTime.Now;

                            xy.Models.ForEach(mxy => mxy.Deleted = DateTime.Now);
                        });
                    });
                }

            });

            _GENERIC_REPO.ProductTypes.UpdateRange(entityToDb);

            if (await _GENERIC_REPO.save())
                return HttpStatusCode.Created;

            throw new GlobalServicesException(GlobalErrorsMessagesException.UnknownError);
        }
        public async Task<List<ProductTypeDto>> GetProductTypesAsync(int companyId)
        {
            var fromDb = await _GENERIC_REPO.ProductTypes.Get(
                predicate =>
                 predicate.CompanyId == companyId &&
                 predicate.Deleted == DateTime.MinValue,
                 null, selector => selector).ToListAsync();

            if (fromDb == null)
                throw new GlobalServicesException(GlobalErrorsMessagesException.ObjIsNull);


            return _IStockProductObjectMapperServices.ProductTypeListMake(fromDb);
        }

        //Products
        public async Task<HttpStatusCode> AddProductAsync(ProductDto dtoView)
        {
            if (dtoView == null)
                throw new GlobalServicesException(GlobalErrorsMessagesException.ObjIsNull);

            var products = new List<ProductDto>();

            if (dtoView.Quantity > 1)
            {
                for (int i = 0; i < dtoView.Quantity; i++)
                {
                    dtoView.Registered = DateTime.Now;
                    products.Add(dtoView);
                }
            }

            if (products.Count > 0)
            {
                var entitiesToDb = _IStockProductObjectMapperServices.ProductListMake(products);
                _GENERIC_REPO.Products.AddRange(entitiesToDb);

                if (await _GENERIC_REPO.save())
                    return HttpStatusCode.Created;

                throw new GlobalServicesException(GlobalErrorsMessagesException.UnknownError);
            }
            else
            {

                var entityToDb = _IStockProductObjectMapperServices.ProductMapper(dtoView);

                entityToDb.Registered = DateTime.Now;


                _GENERIC_REPO.Products.Add(entityToDb);

                if (await _GENERIC_REPO.save())
                    return HttpStatusCode.Created;

                throw new GlobalServicesException(GlobalErrorsMessagesException.UnknownError);
            }

        }

        public async Task<List<ProductDto>> GetProductsIncludedAsync(int companyId)
        {

            var helper = new GetProductsIncludedHelperService();

            var fromDb = await helper.GetProductsIncluded(_GENERIC_REPO, companyId);

            var toDto =  _IStockProductObjectMapperServices.ProductListMake(fromDb);


            helper.ValidateEntity(toDto);

            var toSendFront = helper.GroupItemsByModelId(toDto);

            return toSendFront;

        }
    }
}
