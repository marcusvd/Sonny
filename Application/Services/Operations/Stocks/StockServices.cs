using System.Threading.Tasks;
using AutoMapper;
using Application.Services.Contracts;
using Application.Dto;
using Domain.Entities;
using UnitOfWork.Persistence.Contracts;
using System.Collections.Generic;
using System;
using Application.Exceptions;
using Services.Dto;
using Pagination.Models;
using Application.Services.Helpers;

namespace Application.Services.Operations.Stocks
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

        public Task<StockDto> AddAsync(StockDto record)
        {
            throw new NotImplementedException();
        }

        public Task<StockDto[]> GetAllAsync()
        {
            throw new NotImplementedException();
        }

        public Task<PagedListDto<StockDto>> GetAllPagedAsync(Params parameters)
        {
            throw new NotImplementedException();
        }

        public Task<int> GetCountByCompanyIdAsync(int id)
        {
            throw new NotImplementedException();
        }

        // public async Task<StockDto[]> GetAllAsync()
        // {
        //     List<Stock> entityFromDb = await _GENERIC_REPO.Stocks.GetAllAsync();

        //     if (entityFromDb == null) throw new Exception("O objeto era nulo");

        //     StockDto[] entityDto = _MAP.Map<StockDto[]>(entityFromDb);

        //     return entityDto;

        // }

        // public async Task<StockDto> AddAsync(StockDto entityDto)
        // {

        //     if (entityDto == null) throw new Exception("O objeto era nulo");

        //     Stock entityToDb = _MAP.Map<Stock>(entityDto);
        //     entityToDb.NormalizedName = entityToDb.Equipament.RemoveAccentsAndNormalize();
        //     entityToDb.NormalizedName += " " +entityToDb.Manufacturer.RemoveAccentsAndNormalize();
        //     entityToDb.NormalizedName += " " +entityToDb.Model.RemoveAccentsAndNormalize();


        //     _GENERIC_REPO.Stocks.AddAsync(entityToDb);

        //     if (await _GENERIC_REPO.save())
        //     {
        //         Stock entityFromDb = await _GENERIC_REPO.Stocks.GetByIdAsync(_id => _id.Id == entityToDb.Id);
        //         return _MAP.Map<StockDto>(entityFromDb);
        //     }

        //     return entityDto;

        // }

        // public async Task<PagedListDto<StockDto>> GetAllPagedAsync(Params parameters)
        // {
        //     var fromDb = await _GENERIC_REPO.Stocks.GetStocksPagedAsync(parameters);

        //     if (fromDb == null) throw new GlobalServicesException(GlobalErrorsMessagesException.ObjIsNull);

        //     List<StockDto> ViewDto = _MAP.Map<List<StockDto>>(fromDb);

        //     var PgDto = new PagedListDto<StockDto>()
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
        //     var Count = _GENERIC_REPO.Stocks.GetCountByCompanyIdAsync(x => x.CompanyId == id);

        //     if (Count == null) throw new
        //                             GlobalServicesException(GlobalErrorsMessagesException.ObjIsNull);

        //     return await Count;
        // }



    }

}