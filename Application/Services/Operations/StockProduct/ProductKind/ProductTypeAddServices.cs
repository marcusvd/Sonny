using System;
using System.Collections.Generic;
using System.Net;
using System.Threading.Tasks;
using Application.Exceptions;
using Application.Services.Operations.Finances.Dtos;
using Application.Services.Operations.StockProduct.ProductKind.Add;
using AutoMapper;
using Domain.Entities.StockProduct.ProductKind;
using Microsoft.EntityFrameworkCore;
using UnitOfWork.Persistence.Operations;

namespace Application.Services.Operations.StockProduct.ProductKind
{
    public class ProductTypeAddServices : IProductTypeAddServices
    {
        // private readonly IProductTypeObjectMapperServices _IProductTypeObjectMapperServices;
        private readonly IStockProductObjectMapperServices _IStockProductObjectMapperServices;
        // private readonly IMapper _Mapper;
        private readonly IUnitOfWork _GENERIC_REPO;

        public ProductTypeAddServices(
            IUnitOfWork GENERIC_REPO,
            IStockProductObjectMapperServices IStockProductObjectMapperServices
        // IMapper Mapper
        //  IProductTypeObjectMapperServices IProductTypeObjectMapperServices
        )
        {
            // _IProductTypeObjectMapperServices = IProductTypeObjectMapperServices;
            _GENERIC_REPO = GENERIC_REPO;
            _IStockProductObjectMapperServices = IStockProductObjectMapperServices;
            // _Mapper = Mapper;
        }

        public async Task<HttpStatusCode> AddAsync(ProductTypeDto dtoView)
        {
            if (dtoView == null)
                throw new GlobalServicesException(GlobalErrorsMessagesException.ObjIsNull);

            // var conv = new ProductTypeDto();
            // conv.Name = dtoView.Name;
            // conv.CompanyId = dtoView.CompanyId;
            // conv.Segments = new List<SegmentDto>
            // {
            //     new SegmentDto{
            //        CompanyId = dtoView.Segment.CompanyId,
            //         Name = dtoView.Segment.Name,
            //         Manufacturers  = new List<ManufacturerDto>{
            //             new ManufacturerDto{
            //                 CompanyId = dtoView.Segment.Manufacturer.CompanyId,
            //                  Name = dtoView.Segment.Manufacturer.Name,
            //                  Models = new List<ModelDto>{
            //                     new ModelDto{
            //                         CompanyId = dtoView.Segment.Manufacturer.Model.CompanyId,
            //                         Name = dtoView.Segment.Manufacturer.Model.Name,
            //                         Description = dtoView.Segment.Manufacturer.Model.Description,
            //                     }
            //                  },
            //             }
            //         },
            //     }


            // };

            ProductType entityToDb = _IStockProductObjectMapperServices.ProductTypeMapper(dtoView);

            entityToDb.Registered = DateTime.Now;

            _GENERIC_REPO.ProductsTypes.Add(entityToDb);

            if (await _GENERIC_REPO.save())
                return HttpStatusCode.Created;

            throw new GlobalServicesException(GlobalErrorsMessagesException.UnknownError);
        }

        public async Task<List<ProductTypeDto>> GetAllProcuctsTypesByCompanyIdAsync(int companyId)
        {
            var fromDb = await _GENERIC_REPO
                .ProductsTypes.Get(
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
    }
}