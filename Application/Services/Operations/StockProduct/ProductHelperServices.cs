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
using Domain.Entities.StockProduct.ProductKind;


namespace Application.Services.Operations.StockProduct
{
    public class ProductHelperServices
    {
        

        public void ValidateDto(ProductTypeDto dtoView, int id)
        {
            if (dtoView == null)
                throw new GlobalServicesException(GlobalErrorsMessagesException.ObjIsNull);

            if (dtoView.Id != id)
                throw new GlobalServicesException(GlobalErrorsMessagesException.IdIsDifferentFromEntityUpdate);
        }

        public async Task<ProductType> GetProductTypeById(int id, IUnitOfWork _GENERIC_REPO)
        {
            return await _GENERIC_REPO.ProductTypes.GetById(
                predicate: x => x.Id == id,
                null,
                selector: x => x
            );
        }

        public void MarkSegmentsAsDeleted(ProductType entity)
        {
            entity.Segments.ForEach(segment =>
            {
                if (segment.Deleted != DateTime.MinValue)
                {
                    segment.Deleted = DateTime.Now;
                    segment.Manufacturers.ForEach(manufacturer =>
                    {
                        manufacturer.Deleted = DateTime.Now;
                        manufacturer.Models.ForEach(model => model.Deleted = DateTime.Now);
                    });
                }
            });
        }

        public async Task<ProductType> GetUpdatedProduct(int id, IUnitOfWork _GENERIC_REPO)
        {
            return await _GENERIC_REPO.ProductTypes.GetById(
                predicate: x => x.Id == id,
            toInclude => toInclude.Include(x => x.Segments)
            .ThenInclude(x => x.Manufacturers)
            .ThenInclude(x => x.Models)
            .ThenInclude(x => x.Specificities),
                selector: x => x
            );
        }

        public EditChildrenProductType MapToEditChildrenProductType(ProductTypeDto dtoView, ProductType updatedProduct)
        {
            var segmentName = dtoView.Segments[0].Name.ToLower();
            var manufacturerName = dtoView.Segments[0].Manufacturers[0].Name.ToLower();
            var modelName = dtoView.Segments[0].Manufacturers[0].Models[0].Name.ToLower();

            var segment = updatedProduct.Segments.FirstOrDefault(s => s.Name.ToLower() == segmentName);
            var manufacturer = segment?.Manufacturers.FirstOrDefault(m => m.Name.ToLower() == manufacturerName);
            var model = manufacturer?.Models.FirstOrDefault(m => m.Name.ToLower() == modelName);

            if (segment == null || manufacturer == null || model == null)
                throw new GlobalServicesException(GlobalErrorsMessagesException.ObjIsNull);

            return new EditChildrenProductType
            {
                ProductTypesId = dtoView.Id,
                SegmentId = segment.Id,
                ManufacturerId = manufacturer.Id,
                ModelId = model.Id,
                SpecificitiesId = model.Specificities.Id
            };
        }

    }
}
