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
            var helper = new ProductHelperServices();

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
        // public async Task<EditChildrenProductType> UpdateProductTypeAsync(ProductTypeDto dtoView, int id)
        // {
        //     if (dtoView == null)
        //         throw new GlobalServicesException(GlobalErrorsMessagesException.ObjIsNull);

        //     if (dtoView.Id != id)
        //         throw new GlobalServicesException(GlobalErrorsMessagesException.IdIsDifferentFromEntityUpdate);

        //     var fromDb = await _GENERIC_REPO.ProductTypes.GetById(
        //         x => x.Id == id,
        //         null,
        //         selector => selector
        //         );

        //     if (fromDb == null)
        //         throw new GlobalServicesException(GlobalErrorsMessagesException.ObjIsNull);


        //     var entityToDb = _IStockProductObjectMapperServices.ProductTypeMapper(dtoView);

        //     entityToDb.Segments.ForEach(x =>
        //     {
        //         if (x.Deleted != DateTime.MinValue)
        //         {
        //             x.Deleted = DateTime.Now;

        //             x.Manufacturers.ForEach(xy =>
        //             {
        //                 xy.Deleted = DateTime.Now;

        //                 xy.Models.ForEach(mxy => mxy.Deleted = DateTime.Now);
        //             });
        //         }

        //     });

        //     _GENERIC_REPO.ProductTypes.Update(entityToDb);

        //     if (await _GENERIC_REPO.save())
        //     {

        //         var productById = await _GENERIC_REPO.ProductTypes.GetById(
        //             predicate => predicate.Id == id,
        //             toinclude => toinclude.Include(x => x.Segments).ThenInclude(x => x.Manufacturers).ThenInclude(x => x.Models).ThenInclude(x => x.Specificities),
        //             selector => selector);


        //         var SegmentName = dtoView.Segments[0].Name;
        //         var ManufacturerName = dtoView.Segments[0].Manufacturers[0].Name;
        //         var ModelName = dtoView.Segments[0].Manufacturers[0].Models[0].Name;

        //         var segments = productById.Segments;
        //         var segmentId = segments.Find(x => x.Name.ToLower() == SegmentName.ToLower()).Id;

        //         var manufacturers = segments.Find(x => x.Id == segmentId).Manufacturers;
        //         var manufacturerId = manufacturers.Find(x => x.Name.ToLower() == ManufacturerName.ToLower()).Id;

        //         var models = manufacturers.Find(x => x.Id == manufacturerId).Models;
        //         var modelsResult = models.Find(x => x.Name.ToLower() == ModelName.ToLower());
        //         var modelId = modelsResult.Id;

        //         var specificitiesId = modelsResult.Specificities.Id;


        //           var backToAddNewProduct = new EditChildrenProductType()
        //           {
        //               ProductTypesId = dtoView.Id,
        //               SegmentId = segmentId,
        //               ManufacturerId = manufacturerId,
        //               ModelId = modelId,
        //               SpecificitiesId = specificitiesId

        //           };

        //         return backToAddNewProduct;
        //     }


        //     throw new GlobalServicesException(GlobalErrorsMessagesException.UnknownError);
        // }


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

            var fromDb = await _GENERIC_REPO
                .Products.Get(
                    predicate => predicate.CompanyId == companyId && predicate.Deleted == DateTime.MinValue,
                    toInclude =>
                        toInclude
                            .Include(x => x.ReservedForCustomer)
                            .Include(x => x.User)
                            .Include(x => x.IsReservedByUser)

                            .Include(x => x.ProductType)
                            .Include(x => x.Segment)
                            // .Include(x => x.Segment.Deleted == DateTime.MinValue)
                            .Include(x => x.Manufacturer)
                            // .Include(x => x.Manufacturer.Deleted == DateTime.MinValue)
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
