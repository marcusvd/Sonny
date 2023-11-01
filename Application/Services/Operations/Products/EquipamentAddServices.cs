using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Application.Exceptions;
using Application.Services.Helpers;
using Application.Services.Operations.Products.Dtos;
using AutoMapper;
using Domain.Entities.Product;
using UnitOfWork.Persistence.Operations;

namespace Application.Services.Operations.Products
{
    public class EquipamentAddServices : IEquipamentAddServices
    {
        private readonly IMapper _MAP;
        private readonly IUnitOfWork _GENERIC_REPO;
        public EquipamentAddServices(IUnitOfWork GENERIC_REPO,
                         IMapper MAP)
        {
            _MAP = MAP;
            _GENERIC_REPO = GENERIC_REPO;
        }

        public async Task<EquipamentTypeDto> AddAsync(EquipamentTypeDto entityDto)
        {
            if (entityDto == null) throw new GlobalServicesException(GlobalErrorsMessagesException.ObjIsNull);

            var toDb = _MAP.Map<EquipamentType>(entityDto);

            _GENERIC_REPO.Equipaments.Add(toDb);

            if (await _GENERIC_REPO.save())
            {
                var fromDb = await _GENERIC_REPO.Equipaments.GetById(x => x.Id == toDb.Id);
                return _MAP.Map<EquipamentTypeDto>(fromDb);
            }

            return entityDto;

        }
        public async Task<KeyValuePair<string, int>> AddRangeAsync(List<EquipamentTypeDto> ListEntitiesDtos)
        {
            if (ListEntitiesDtos == null) throw new GlobalServicesException(GlobalErrorsMessagesException.ObjIsNull);

            var toDb = _MAP.Map<List<EquipamentType>>(ListEntitiesDtos);

            ListEntitiesDtos.ForEach(x =>
            {
                toDb.ForEach(xy =>
                {
                    if (xy.Name == x.Name)
                        xy.NormalizedName = x.Name.RemoveAccentsAndNormalize();
                });
            });

            _GENERIC_REPO.Equipaments.AddRangeAsync(toDb);

            if (await _GENERIC_REPO.save())
            {
                return new KeyValuePair<string, int>("Succeeded Added.", 200);
            }

            return new KeyValuePair<string, int>("Fail when adding.", 400);

        }
    }
}