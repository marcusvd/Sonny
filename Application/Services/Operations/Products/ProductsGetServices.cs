using System.Threading.Tasks;
using AutoMapper;
using UnitOfWork.Persistence.Operations;
using Application.Exceptions;
using Application.Services.Operations.Products.Dtos;
using Pagination.Models;
using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using Domain.Entities.Product;

namespace Application.Services.Operations.Products
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

        public async Task<PagedList<ProductDto>> GetAllPagedAsync(Params parameters)
        {
            var fromDb = await _GENERIC_REPO.Products.GetPaged(parameters, predicate => predicate.StockId == parameters.predicate);

            if (fromDb == null) throw new GlobalServicesException(GlobalErrorsMessagesException.ObjIsNull);

            List<ProductDto> ViewDto = _MAP.Map<List<ProductDto>>(fromDb);

            var PgDto = new PagedList<ProductDto>()
            {
                CurrentPg = fromDb.CurrentPg,
                TotalPgs = fromDb.TotalPgs,
                PgSize = fromDb.PgSize,
                TotalCount = fromDb.TotalCount,
                HasPrevious = fromDb.HasPrevious,
                HasNext = fromDb.HasNext,
                EntitiesToShow = ViewDto
            };
            return PgDto;
        }


        public async Task<List<ProductGroupedToDtoView>> GetAllProductGroupedToDtoView(int stockId)
        {
            List<ProductGroupedToDtoView> listToReturn = new();

            ProductGroupedToDtoView Grouped = new();
            Grouped.Products = new();

            ProductGroupedToDtoView unit;

            var fromDb = await _GENERIC_REPO.Products.GetAllByStockIdNameEquipamentIncluded(stockId);

            var repeated = fromDb.Select(x => x.NameId).GroupBy(x => x).Where(xy => xy.Count() > 1).Select(xxy => xxy.Key).ToList();

            fromDb.ForEach(x =>
            {
                repeated.ForEach(xy =>
                {
                    if (x.NameId == xy)
                    {
                        Grouped.EquipamentName = x.Name.Name;
                        Grouped.Products.Add(x);
                    }
                    if (x.NameId != xy)
                    {
                        unit = new();
                        unit.Products = new();
                        unit.EquipamentName = x.Name.Name;
                        unit.Products.Add(x);
                        listToReturn.Add(unit);
                    }
                });

            });

            listToReturn.Add(Grouped);
            return listToReturn;
        }






    }

}