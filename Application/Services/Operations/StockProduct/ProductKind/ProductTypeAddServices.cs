using System;
using System.Threading.Tasks;
using UnitOfWork.Persistence.Operations;
using Application.Exceptions;

using System.Net;
using AutoMapper;
using Domain.Entities.StockProduct.ProductKind;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;


namespace Application.Services.Operations.StockProduct.ProductKind
{
    public class ProductTypeAddServices : IProductTypeAddServices
    {
        // private readonly IProductTypeObjectMapperServices _IProductTypeObjectMapperServices;
        private readonly IMapper _Mapper;
        private readonly IUnitOfWork _GENERIC_REPO;
        public ProductTypeAddServices(
                         IUnitOfWork GENERIC_REPO,
                         IMapper Mapper
                        //  IProductTypeObjectMapperServices IProductTypeObjectMapperServices
                        )
        {
            // _IProductTypeObjectMapperServices = IProductTypeObjectMapperServices;
            _GENERIC_REPO = GENERIC_REPO;
            _Mapper = Mapper;
        }

        public async Task<HttpStatusCode> AddAsync(ProductTypeDto dtoView)
        {
            if (dtoView == null) throw new GlobalServicesException(GlobalErrorsMessagesException.ObjIsNull);

            ProductType entityToDb = _Mapper.Map<ProductType>(dtoView);

            entityToDb.Registered = DateTime.Now;

            _GENERIC_REPO.ProductsTypes.Add(entityToDb);

            if (await _GENERIC_REPO.save())
                return HttpStatusCode.Created;

            throw new GlobalServicesException(GlobalErrorsMessagesException.UnknownError);
        }


        public async Task<List<ProductTypeDto>> GetAllProcuctsTypesByCompanyIdAsync(int companyId)
        {
            var fromDb = await _GENERIC_REPO.ProductsTypes.Get(
                predicate => predicate.CompanyId == companyId,
                toInclude => toInclude.Include(x=> x.Segments)
                .ThenInclude(x=> x.Manufacturers)
                .ThenInclude(x=> x.Models),
                selector => selector
            ).ToListAsync();

            if (fromDb == null) throw new Exception(GlobalErrorsMessagesException.ObjIsNull);


            return _Mapper.Map<List<ProductTypeDto>>(fromDb);
        }

    }
}