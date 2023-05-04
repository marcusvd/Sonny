using System.Threading.Tasks;
using AutoMapper;
using Application.Services.Contracts;
using Application.Dto;
using Domain.Entities;
using UnitOfWork.Persistence.Contracts;
using System.Collections.Generic;
using System;

namespace Application.Services.Operations
{
    public class StockServices : IStockServices
    {
        private readonly IMapper _MAP;
        private readonly IUnitOfWork _GENERIC_REPO;
        public StockServices(
                         IUnitOfWork GENERIC_REPO,
                         IMapper MAP
                        )
        {
            _MAP = MAP;
            _GENERIC_REPO = GENERIC_REPO;
        }

        public async Task<StockDto[]> GetAllAsync()
        {
            List<Stock> entityFromDb = await _GENERIC_REPO.Stocks.GetAllAsync();

            if (entityFromDb == null) throw new Exception("O objeto era nulo");

            StockDto[] entityDto = _MAP.Map<StockDto[]>(entityFromDb);

            return entityDto;

        }

        public async Task<StockDto> AddAsync(StockDto entityDto)
        {

            if (entityDto == null) throw new Exception("O objeto era nulo");

            Stock entityToDb = _MAP.Map<Stock>(entityDto);

            _GENERIC_REPO.Stocks.AddAsync(entityToDb);

            if (await _GENERIC_REPO.save())
            {
                Stock entityFromDb = await _GENERIC_REPO.Stocks.GetByIdAsync(_id => _id.Id == entityToDb.Id);
                return _MAP.Map<StockDto>(entityFromDb);
            }

            return entityDto;

        }

    }

}