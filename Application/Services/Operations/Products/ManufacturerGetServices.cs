using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Application.Exceptions;
using Application.Services.Operations.Products.Dtos;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Pagination.Models;
using UnitOfWork.Persistence.Contracts;

namespace Application.Services.Operations.Products
{
    public class ManufacturerGetServices : IManufacturerGetServices
    {
        private readonly IMapper _MAP;
        private readonly IUnitOfWork _GENERIC_REPO;
        public ManufacturerGetServices(
            IUnitOfWork GENERIC_REPO,
                         IMapper MAP
                         )
        {
            _MAP = MAP;
            _GENERIC_REPO = GENERIC_REPO;
        }

        public async Task<List<ManufacturerDto>> GetAllAsync(int companyId)
        {
            var entityFromDb = await _GENERIC_REPO.Manufacturers.GetAllByCompanyIdAsync(x => x.CompanyId == companyId);

            if (entityFromDb == null) throw new GlobalServicesException(GlobalErrorsMessagesException.ObjIsNull);

            return _MAP.Map<List<ManufacturerDto>>(entityFromDb);
        }
        public async Task<PagedList<ManufacturerDto>> GetAllPagedAsync(Params parameters)
        {
            var fromDb = await _GENERIC_REPO.Manufacturers.GetManufacturersPagedAsync(parameters);

            if (fromDb == null) throw new GlobalServicesException(GlobalErrorsMessagesException.ObjIsNull);

            List<ManufacturerDto> ViewDto = _MAP.Map<List<ManufacturerDto>>(fromDb);

            var PgDto = new PagedList<ManufacturerDto>()
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
        public async Task<int> GetCountByCompanyIdAsync(int id)
        {
            var totalEquipaments = _GENERIC_REPO.Manufacturers.GetCountByCompanyIdAsync(x => x.CompanyId == id);

            if (totalEquipaments == null) throw new
                                    GlobalServicesException(GlobalErrorsMessagesException.ObjIsNull);

            return await totalEquipaments;
        }

    }
}