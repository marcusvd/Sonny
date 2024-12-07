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
        public async Task<HttpStatusCode> UpdateProductTypeRangeAsync(List<ProductTypeDto> dtoView)
        {
            if (dtoView == null)
                throw new GlobalServicesException(GlobalErrorsMessagesException.ObjIsNull);

            var fromView = dtoView;

            fromView.ForEach(x =>
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

            var entityToDb = _IStockProductObjectMapperServices.ProductTypeListMake(fromView);

            _GENERIC_REPO.ProductTypes.UpdateRange(entityToDb);

            if (await _GENERIC_REPO.save())
                return HttpStatusCode.Created;

            throw new GlobalServicesException(GlobalErrorsMessagesException.UnknownError);
        }




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
