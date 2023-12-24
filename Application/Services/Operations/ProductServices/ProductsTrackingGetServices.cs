using System.Threading.Tasks;
using AutoMapper;
using UnitOfWork.Persistence.Operations;
using Application.Services.Operations.ProductServices.Dtos;
using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using Pagination.Models;
using System;
using Application.Exceptions;

namespace Application.Services.Operations.ProductServices
{
    public class ProductsTrackingGetServices : IProductsTrackingGetServices
    {
        private readonly IMapper _MAP;
        private readonly IUnitOfWork _GENERIC_REPO;
        public ProductsTrackingGetServices(
                         IUnitOfWork GENERIC_REPO,
                         IMapper MAP
                        )
        {
            _MAP = MAP;
            _GENERIC_REPO = GENERIC_REPO;
        }

        public async Task<Page<TrackingDto>> GetByIdInServicesAsync(Params parameters)
        {
            var fromDb = await _GENERIC_REPO.TrackingsProducts.GetPaged(parameters, predicate => predicate.CustomerId == parameters.predicate,
                toInclude => toInclude
                .Include(x => x.Product)
                .ThenInclude(x => x.Equipament),
                  selector => selector,
                  orderBy => orderBy.OrderBy(x => x.Id)
                //   termPredicate => termPredicate.IncludedService
                );

            if (fromDb == null) throw new Exception(GlobalErrorsMessagesException.ObjIsNull);

            List<TrackingDto> ViewDto = _MAP.Map<List<TrackingDto>>(fromDb);

            var pagedToReturn = new Page<TrackingDto>()
            {
                CurrentPg = fromDb.CurrentPg,
                TotalPgs = fromDb.TotalPgs,
                PgSize = fromDb.PgSize,
                TotalCount = fromDb.TotalCount,
                HasPrevious = fromDb.HasPrevious,
                HasNext = fromDb.HasNext,
                EntitiesToShow = ViewDto
            };

            return pagedToReturn;
        }

    }

}