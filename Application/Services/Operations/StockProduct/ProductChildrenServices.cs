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
    public class ProductChildrenServices : IProductChildrenServices
    {
        private readonly IStockProductObjectMapperServices _IStockProductObjectMapperServices;
        private readonly IUnitOfWork _GENERIC_REPO;

        public ProductChildrenServices(
            IUnitOfWork GENERIC_REPO,
            IStockProductObjectMapperServices IStockProductObjectMapperServices
        )
        {
            _GENERIC_REPO = GENERIC_REPO;
            _IStockProductObjectMapperServices = IStockProductObjectMapperServices;
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

        public async Task<HttpStatusCode> UpdateSegmentRangeAsync(List<SegmentDto> dtoView)
        {
            if (dtoView == null)
                throw new GlobalServicesException(GlobalErrorsMessagesException.ObjIsNull);

            var fromDb = await _GENERIC_REPO.Segments.Get(
                 predicate => predicate.CompanyId == dtoView[0].CompanyId && predicate.Deleted == DateTime.MinValue,
                 toInclude => toInclude.Include(x => x.Manufacturers).ThenInclude(x => x.Models),
                 selector => selector
                 ).ToListAsync();

            var entityToDb = _IStockProductObjectMapperServices.SegmentUpdateListMake(dtoView, fromDb);

            entityToDb.ForEach(x =>
            {
                if (x.Deleted != DateTime.MinValue)
                {
                    x.Deleted = DateTime.Now;

                    x.Manufacturers.ForEach(xy =>
                     {
                         xy.Deleted = DateTime.Now;

                         xy.Models.ForEach(mxy => mxy.Deleted = DateTime.Now);
                     });
                }

            });

            _GENERIC_REPO.Segments.UpdateRange(entityToDb);

            if (await _GENERIC_REPO.save())
                return HttpStatusCode.Created;

            throw new GlobalServicesException(GlobalErrorsMessagesException.UnknownError);
        }
        public async Task<HttpStatusCode> UpdateManufacturerRangeAsync(List<ManufacturerDto> dtoView)
        {

            if (dtoView == null)
                throw new GlobalServicesException(GlobalErrorsMessagesException.ObjIsNull);

            var fromView = dtoView;

            fromView.ForEach(x =>
            {
                if (x.Deleted != DateTime.MinValue)
                    x.Deleted = DateTime.Now;
            });

            var entityToDb = _IStockProductObjectMapperServices.ManufacturerListMake(fromView);

            _GENERIC_REPO.Manufacturers.UpdateRange(entityToDb);

            if (await _GENERIC_REPO.save())
                return HttpStatusCode.Created;

            throw new GlobalServicesException(GlobalErrorsMessagesException.UnknownError);
        }
        public async Task<HttpStatusCode> UpdateModelRangeAsync(List<ModelDto> dtoView)
        {

            if (dtoView == null)
                throw new GlobalServicesException(GlobalErrorsMessagesException.ObjIsNull);

            var fromView = dtoView;

            fromView.ForEach(x =>
            {
                if (x.Deleted != DateTime.MinValue)
                    x.Deleted = DateTime.Now;
            });

            var entityToDb = _IStockProductObjectMapperServices.ModelListMake(fromView);

            _GENERIC_REPO.Models.UpdateRange(entityToDb);

            if (await _GENERIC_REPO.save())
                return HttpStatusCode.Created;

            throw new GlobalServicesException(GlobalErrorsMessagesException.UnknownError);
        }
    }
}
