using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Application.Exceptions;
using Application.Services.Helpers;
using Application.Services.Operations.ProductServices.Dtos;
using Application.Services.Operations.ProductServices.Dtos.Fill;
using AutoMapper;
using Domain.Entities.Fill.StkProduct;
using Domain.Entities.StkProduct;
using Microsoft.EntityFrameworkCore;
using UnitOfWork.Persistence.Operations;

namespace Application.Services.Operations.ProductServices
{

    public class EquipamentFillCrudServices : IEquipamentFillCrudServices
    {
        private readonly IMapper _MAP;
        private readonly IUnitOfWork _GENERIC_REPO;
        public EquipamentFillCrudServices(IUnitOfWork GENERIC_REPO,
                                           IMapper MAP)
        {
            _MAP = MAP;
            _GENERIC_REPO = GENERIC_REPO;
        }

        public async Task<KeyValuePair<string, int>> AddRangeAsync(List<Equipament_FillDto> ListEntitiesDtos)
        {
            if (ListEntitiesDtos == null) throw new GlobalServicesException(GlobalErrorsMessagesException.ObjIsNull);

            var toDb = _MAP.Map<List<Equipament_Fill>>(ListEntitiesDtos);


            _GENERIC_REPO.Equipaments_Fillers.AddRangeAsync(toDb);

            if (await _GENERIC_REPO.save())
            {
                return new KeyValuePair<string, int>("Succeeded Added.", 200);
            }

            return new KeyValuePair<string, int>("Fail when adding.", 400);

        }

        public async Task<List<Equipament_FillDto>> GetAll(int companyId)
        {
            var fromDb = await _GENERIC_REPO.Equipaments_Fillers.Get(
                predicate => predicate.CompanyId == companyId,
                null,
                selector => selector
            ).ToListAsync();

            var toViewReturn  = _MAP.Map<List<Equipament_FillDto>>(fromDb);

            return toViewReturn;
        }
    }


    public class ManufacturerFillCrudServices : IManufacturerFillCrudServices
    {
        private readonly IMapper _MAP;
        private readonly IUnitOfWork _GENERIC_REPO;
        public ManufacturerFillCrudServices(IUnitOfWork GENERIC_REPO,
                         IMapper MAP)
        {
            _MAP = MAP;
            _GENERIC_REPO = GENERIC_REPO;
        }

        public async Task<KeyValuePair<string, int>> AddRangeAsync(List<Manufacturer_FillDto> ListEntitiesDtos)
        {
            if (ListEntitiesDtos == null) throw new GlobalServicesException(GlobalErrorsMessagesException.ObjIsNull);

            var toDb = _MAP.Map<List<Manufacturer_Fill>>(ListEntitiesDtos);


            _GENERIC_REPO.Manufacturers_Fillers.AddRangeAsync(toDb);

            if (await _GENERIC_REPO.save())
            {
                return new KeyValuePair<string, int>("Succeeded Added.", 200);
            }

            return new KeyValuePair<string, int>("Fail when adding.", 400);

        }

        public async Task<List<Manufacturer_FillDto>> GetAll(int companyId)
        {
            var fromDb = await _GENERIC_REPO.Manufacturers_Fillers.Get(
                predicate => predicate.CompanyId == companyId,
                null,
                selector => selector
            ).ToListAsync();

            var toViewReturn  = _MAP.Map<List<Manufacturer_FillDto>>(fromDb);

            return toViewReturn;
        }
    }


    public class SegmentFillCrudServices : ISegmentFillCrudServices
    {
        private readonly IMapper _MAP;
        private readonly IUnitOfWork _GENERIC_REPO;
        public SegmentFillCrudServices(IUnitOfWork GENERIC_REPO,
                         IMapper MAP)
        {
            _MAP = MAP;
            _GENERIC_REPO = GENERIC_REPO;
        }

        public async Task<KeyValuePair<string, int>> AddRangeAsync(List<Segment_FillDto> ListEntitiesDtos)
        {
            if (ListEntitiesDtos == null) throw new GlobalServicesException(GlobalErrorsMessagesException.ObjIsNull);

            var toDb = _MAP.Map<List<Segment_Fill>>(ListEntitiesDtos);


            _GENERIC_REPO.Segments_Fillers.AddRangeAsync(toDb);

            if (await _GENERIC_REPO.save())
            {
                return new KeyValuePair<string, int>("Succeeded Added.", 200);
            }

            return new KeyValuePair<string, int>("Fail when adding.", 400);

        }

        public async Task<List<Segment_FillDto>> GetAll(int companyId)
        {
             var fromDb = await _GENERIC_REPO.Segments_Fillers.Get(
                predicate => predicate.CompanyId == companyId,
                null,
                selector => selector
            ).ToListAsync();

            var toViewReturn  = _MAP.Map<List<Segment_FillDto>>(fromDb);

            return toViewReturn;
        }
    }




}