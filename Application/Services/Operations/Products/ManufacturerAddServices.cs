using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Application.Exceptions;
using Application.Services.Helpers;
using Application.Services.Operations.Products.Dtos;
using AutoMapper;
using Domain.Entities.Product;
using UnitOfWork.Persistence.Contracts;

namespace Application.Services.Operations.Products
{
    public class ManufacturerAddServices : IManufacturerAddServices
    {
        private readonly IMapper _MAP;
        private readonly IUnitOfWork _GENERIC_REPO;
        public ManufacturerAddServices(IUnitOfWork GENERIC_REPO,
                         IMapper MAP)
        {
            _MAP = MAP;
            _GENERIC_REPO = GENERIC_REPO;
        }

        public async Task<ManufacturerDto> AddAsync(ManufacturerDto entityDto)
        {
            if (entityDto == null) throw new GlobalServicesException(GlobalErrorsMessagesException.ObjIsNull);

            var toDb = _MAP.Map<Manufacturer>(entityDto);

            _GENERIC_REPO.Manufacturers.AddAsync(toDb);

            if (await _GENERIC_REPO.save())
            {
                var fromDb = await _GENERIC_REPO.Manufacturers.GetByIdAsync(x => x.Id == toDb.Id);
                return _MAP.Map<ManufacturerDto>(fromDb);
            }

            return entityDto;

        }

        public async Task<KeyValuePair<string, int>> AddRangeAsync(List<ManufacturerDto> ListEntitiesDtos)
        {
            if (ListEntitiesDtos == null) throw new GlobalServicesException(GlobalErrorsMessagesException.ObjIsNull);

            var toDb = _MAP.Map<List<Manufacturer>>(ListEntitiesDtos);

         ListEntitiesDtos.ForEach(x =>
            {
                toDb.ForEach(xy =>
                {
                    if (xy.Name == x.Name)
                        xy.NormalizedName = x.Name.RemoveAccentsAndNormalize();
                });
            });


            _GENERIC_REPO.Manufacturers.AddRangeAsync(toDb);

            if (await _GENERIC_REPO.save())
            {
                return new KeyValuePair<string, int>("Succeeded Added.", 200);
            }

            return new KeyValuePair<string, int>("Fail when adding.", 400);

        }
    }
}