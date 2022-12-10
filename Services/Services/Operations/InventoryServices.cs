using System.Threading.Tasks;
using AutoMapper;
using Services.Services.Contracts;
using Services.Dto;
using Domain.Entities;
using UnitOfWork.Persistence.Contracts;
using System.Collections.Generic;
using System;

namespace Services.Services.Operations
{
    public class InventoryServices : IInventoryServices
    {
        private readonly IMapper _MAP;
        private readonly IUnitOfWork _GENERIC_REPO;
        public InventoryServices(
                         IUnitOfWork GENERIC_REPO,
                         IMapper MAP
                        )
        {
            _MAP = MAP;
            _GENERIC_REPO = GENERIC_REPO;
        }

        public async Task<InventoryDto[]> GetAllAsync()
        {
            List<Inventory> entityFromDb = await _GENERIC_REPO.Inventories.GetAllAsync();

            if (entityFromDb == null) throw new Exception("O objeto era nulo");

            InventoryDto[] entityDto = _MAP.Map<InventoryDto[]>(entityFromDb);

            return entityDto;

        }

        public async Task<InventoryDto> AddAsync(InventoryDto entityDto)
        {

            if (entityDto == null) throw new Exception("O objeto era nulo");

            Inventory entityToDb = _MAP.Map<Inventory>(entityDto);

            _GENERIC_REPO.Inventories.AddAsync(entityToDb);

            if (await _GENERIC_REPO.save())
            {
                Inventory entityFromDb = await _GENERIC_REPO.Inventories.GetByIdAsync(_id => _id.Id == entityToDb.Id);
                return _MAP.Map<InventoryDto>(entityFromDb);
            }

            return entityDto;

        }

    }

}