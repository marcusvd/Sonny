using System.Threading.Tasks;
using AutoMapper;
using UnitOfWork.Persistence.Operations;
using Application.Exceptions;
using Application.Services.Operations.ProductServices.Dtos;
using Pagination.Models;
using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using System;
using Domain.Entities.StkProduct;

namespace Application.Services.Operations.ProductServices
{
    public class ProductsGetServices : IProductsGetServices
    {
        private readonly IMapper _MAP;
        private readonly IUnitOfWork _GENERIC_REPO;
        public ProductsGetServices(
                         IUnitOfWork GENERIC_REPO,
                         IMapper MAP
                        )
        {
            _MAP = MAP;
            _GENERIC_REPO = GENERIC_REPO;
        }

        public async Task<Page<ProductDto>> GetAllAvailableToSellPagedAsync(Params parameters)
        {

            var fromDb = await _GENERIC_REPO.Products.GetPaged(
                parameters, predicate => predicate.CompanyId == parameters.predicate,
                toInclude => toInclude
                .Include(x => x.Equipament)
                .Include(x => x.Quantities),
                selector => selector
                );

            if (fromDb == null) throw new GlobalServicesException(GlobalErrorsMessagesException.ObjIsNull);

            DateTime minDate = DateTime.MinValue;

            fromDb.ForEach(x =>
            {
                x.Quantities.ToList().ForEach(xy =>
                {
                    if (xy.IsReserved != minDate || xy.SoldDate != minDate)
                        x.Quantities.RemoveAt(xy.Id);
                });
            });

            var viewDto = _MAP.Map<List<ProductDto>>(fromDb);

            var pagedToReturn = new Page<ProductDto>()
            {
                // CurrentPg = fromDb.CurrentPg,
                // TotalPgs = fromDb.TotalPgs,
                // PgSize = fromDb.PgSize,
                // TotalCount = fromDb.TotalCount,
                // HasPrevious = fromDb.HasPrevious,
                // HasNext = fromDb.HasNext,
                EntitiesToShow = viewDto
            };

            return pagedToReturn;
        }

        public async Task<int> GetLengthAsync(int companyId)
        {
            var lengthFromDb = _GENERIC_REPO.Products.GetCount(predicate => predicate.CompanyId == companyId);

            if (lengthFromDb == null) throw new
                               GlobalServicesException(GlobalErrorsMessagesException.ObjIsNull);

            return await lengthFromDb;
        }

        public async Task<ProductDto> GetProductByIdAsync(int productId)
        {
            var fromDb = await _GENERIC_REPO.Products.GetById(
                predicate => predicate.Id == productId,
                toInclude => toInclude.Include(x=>x.Equipament),
                selector => selector
                );

            if (fromDb == null) throw new
                               GlobalServicesException(GlobalErrorsMessagesException.ObjIsNull);

            var toReturn = _MAP.Map<ProductDto>(fromDb);

            return toReturn;
        }


        // public async Task<List<ProductGroupedToDtoView>> GetAllProductGroupedToDtoView(int stockId)
        // {
        //     List<ProductGroupedToDtoView> listToReturn = new();

        //     ProductGroupedToDtoView Grouped = new();
        //     Grouped.Products = new();

        //     ProductGroupedToDtoView unit;

        //     var fromDb = await _GENERIC_REPO.Products.GetAllByStockIdNameEquipamentIncluded(stockId);

        //     var repeated = fromDb.Select(x => x.NameId).GroupBy(x => x).Where(xy => xy.Count() > 1).Select(xxy => xxy.Key).ToList();

        //     fromDb.ForEach(x =>
        //     {
        //         repeated.ForEach(xy =>
        //         {
        //             if (x.NameId == xy)
        //             {
        //                 Grouped.EquipamentName = x.Name.Name;
        //                 Grouped.Products.Add(x);
        //             }
        //             if (x.NameId != xy)
        //             {
        //                 unit = new();
        //                 unit.Products = new();
        //                 unit.EquipamentName = x.Name.Name;
        //                 unit.Products.Add(x);
        //                 listToReturn.Add(unit);
        //             }
        //         });

        //     });

        //     listToReturn.Add(Grouped);
        //     return listToReturn;
        // }






    }

}