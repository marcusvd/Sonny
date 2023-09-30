using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Application.Exceptions;
using Application.Services.Operations.Products.Dtos;
using AutoMapper;
using Domain.Entities.Product;
using Pagination.Models;
using UnitOfWork.Persistence.Contracts;

namespace Application.Services.Operations.Products
{
    public class EquipamentGetServices : IEquipamentGetServices
    {
        private readonly IMapper _MAP;
        private readonly IUnitOfWork _GENERIC_REPO;
        public EquipamentGetServices(IUnitOfWork GENERIC_REPO,
                                     IMapper MAP)
        {
            _MAP = MAP;
            _GENERIC_REPO = GENERIC_REPO;
        }

        public async Task<List<EquipamentTypeDto>> GetAllAsync(int companyId)
        {
            var entityFromDb = await _GENERIC_REPO.Equipaments.GetAllByCompanyIdAsync(x => x.CompanyId == companyId);

            if (entityFromDb == null) throw new GlobalServicesException(GlobalErrorsMessagesException.ObjIsNull);

            return _MAP.Map<List<EquipamentTypeDto>>(entityFromDb);
        }

        public async Task<PagedList<EquipamentTypeDto>> GetAllPagedAsync(Params parameters)
        {
            var fromDb = await _GENERIC_REPO.Equipaments.GetEquipamentsPagedAsync(parameters);

            if (fromDb == null) throw new GlobalServicesException(GlobalErrorsMessagesException.ObjIsNull);

            List<EquipamentTypeDto> ViewDto = _MAP.Map<List<EquipamentTypeDto>>(fromDb);

            var PgDto = new PagedList<EquipamentTypeDto>()
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
            var totalEquipaments = _GENERIC_REPO.Equipaments.GetCountByCompanyIdAsync(x => x.CompanyId == id);

            if (totalEquipaments == null) throw new
                                    GlobalServicesException(GlobalErrorsMessagesException.ObjIsNull);

            return await totalEquipaments;
        }


    }
}