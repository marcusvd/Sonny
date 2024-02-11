using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using Application.Exceptions;
using Application.Services.Helpers;
using Application.Services.Operations.ProductServices.Dtos.Fill;
using AutoMapper;
using Domain.Entities.Fill.StkProduct;
using Microsoft.EntityFrameworkCore;
using UnitOfWork.Persistence.Operations;

namespace Application.Services.Operations.ProductServices.Fillers
{



    public class ModelFillCrudServices : IModelFillCrudServices
    {
        private readonly IMapper _MAP;
        private readonly IUnitOfWork _GENERIC_REPO;
        public ModelFillCrudServices(IUnitOfWork GENERIC_REPO,
                                           IMapper MAP)
        {
            _MAP = MAP;
            _GENERIC_REPO = GENERIC_REPO;
        }

        public async Task<KeyValuePair<string, int>> AddRangeAsync(List<ModelDto> ListEntitiesDtos)
        {
            if (ListEntitiesDtos == null) throw new GlobalServicesException(GlobalErrorsMessagesException.ObjIsNull);

            var toDb = _MAP.Map<List<Model>>(ListEntitiesDtos);


            _GENERIC_REPO.Models_Fillers.AddRangeAsync(toDb);

            if (await _GENERIC_REPO.save())
            {
                return new KeyValuePair<string, int>("Succeeded Added.", 200);
            }

            return new KeyValuePair<string, int>("Fail when adding.", 400);

        }

        public async Task<List<ModelDto>> GetAll(int itemId)
        {
            var fromDb = await _GENERIC_REPO.Models_Fillers.Get(
                predicate => predicate.ItemId == itemId,
                null,
                selector => selector
            ).ToListAsync();

            var toViewReturn  = _MAP.Map<List<ModelDto>>(fromDb);

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

        public async Task<KeyValuePair<string, int>> AddRangeAsync(List<ManufacturerDto> ListEntitiesDtos)
        {
            if (ListEntitiesDtos == null) throw new GlobalServicesException(GlobalErrorsMessagesException.ObjIsNull);

            var toDb = _MAP.Map<List<Manufacturer>>(ListEntitiesDtos);


            _GENERIC_REPO.Manufacturers_Fillers.AddRangeAsync(toDb);

            if (await _GENERIC_REPO.save())
            {
                return new KeyValuePair<string, int>("Succeeded Added.", 200);
            }

            return new KeyValuePair<string, int>("Fail when adding.", 400);

        }

        public async Task<List<ManufacturerDto>> GetAll(int itemId)
        {
            var fromDb = await _GENERIC_REPO.Manufacturers_Fillers.Get(
                 predicate => predicate.ItemId == itemId,
                null,
                selector => selector
            ).ToListAsync();

            var toViewReturn  = _MAP.Map<List<ManufacturerDto>>(fromDb);

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

        public async Task<KeyValuePair<string, int>> AddRangeAsync(List<SegmentDto> ListEntitiesDtos)
        {
            if (ListEntitiesDtos == null) throw new GlobalServicesException(GlobalErrorsMessagesException.ObjIsNull);

            var toDb = _MAP.Map<List<Segment>>(ListEntitiesDtos);


            _GENERIC_REPO.Segments_Fillers.AddRangeAsync(toDb);

            if (await _GENERIC_REPO.save())
            {
                return new KeyValuePair<string, int>("Succeeded Added.", 200);
            }

            return new KeyValuePair<string, int>("Fail when adding.", 400);

        }

        public async Task<List<SegmentDto>> GetAll(int itemId)
        {
             var fromDb = await _GENERIC_REPO.Segments_Fillers.Get(
                 predicate => predicate.ItemId == itemId,
                null,
                selector => selector
            ).ToListAsync();

            var toViewReturn  = _MAP.Map<List<SegmentDto>>(fromDb);

            return toViewReturn;
        }
    }




}