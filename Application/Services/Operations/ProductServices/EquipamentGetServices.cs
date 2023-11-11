using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Application.Exceptions;
using Application.Services.Operations.ProductServices.Dtos;
using AutoMapper;
using Domain.Entities.StkProduct;
using Microsoft.EntityFrameworkCore;
using Pagination.Models;
using UnitOfWork.Persistence.Operations;

namespace Application.Services.Operations.ProductServices
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

        // public async Task<List<EquipamentDto>> GetAllAsync(int companyId)
        // {
        //     var entityFromDb = await _GENERIC_REPO.Equipaments.Get(x => x.CompanyId == companyId).ToListAsync();

        //     if (entityFromDb == null) throw new GlobalServicesException(GlobalErrorsMessagesException.ObjIsNull);

        //     return _MAP.Map<List<EquipamentDto>>(entityFromDb);
        // }

        // public async Task<PagedList<EquipamentDto>> GetAllPagedAsync(Params parameters)
        // {
        //     var fromDb = await _GENERIC_REPO.Equipaments.GetPaged();

        //     if (fromDb == null) throw new GlobalServicesException(GlobalErrorsMessagesException.ObjIsNull);

        //     List<EquipamentDto> ViewDto = _MAP.Map<List<EquipamentDto>>(fromDb);

        //     var PgDto = new PagedList<EquipamentDto>()
        //     {
        //         CurrentPg = fromDb.CurrentPg,
        //         TotalPgs = fromDb.TotalPgs,
        //         PgSize = fromDb.PgSize,
        //         TotalCount = fromDb.TotalCount,
        //         HasPrevious = fromDb.HasPrevious,
        //         HasNext = fromDb.HasNext,
        //         EntitiesToShow = ViewDto
        //     };
        //     return PgDto;

        // }

        // public async Task<int> GetCountByCompanyIdAsync(int id)
        // {
        //     var totalEquipaments = _GENERIC_REPO.Equipaments.Get(x => x.CompanyId == id);

        //     if (totalEquipaments == null) throw new
        //                             GlobalServicesException(GlobalErrorsMessagesException.ObjIsNull);

        //     return await totalEquipaments.CountAsync();
        // }


    }
}