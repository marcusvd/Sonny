using System;
using System.Threading.Tasks;
using AutoMapper;
using Services.Services.Contracts;
using Services.Dto;
using Domain.Entities;
using Repository.Data;
using Repository.Data.Operations;
using Repository.Data.Contracts;
using UnitOfWork.Persistence.Contracts;
using System.Collections.Generic;
using Pagination;

namespace Services.Services.Operations
{
    public class CollectDeliverServices : ICollectDeliverServices
    {
        //private readonly IClientRepository _CLIENT_REPO;
        private readonly IMapper _MAP;
        private readonly IUnitOfWork _GENERIC_REPO;
        public CollectDeliverServices(
                         // IClientRepository CLIENT_REPO,
                         IUnitOfWork GENERIC_REPO,
                         IMapper MAP
                        )
        {
            _MAP = MAP;
            _GENERIC_REPO = GENERIC_REPO;
        }
        public async Task<CollectDeliverDto> AddAsync(CollectDeliverDto viewModel)
        {
            try
            {
                if (viewModel == null) throw new Exception("Erro, Objeto era nulo.");

                CollectDeliver record = _MAP.Map<CollectDeliver>(viewModel);

                // if (record.DestinyClient.Id == 0)
                // {
                //     record.DestinyClient.Id = 0;
                // }
                // if (record.DestinyPartner.Id == 0)
                // {
                //     record.DestinyPartner.Id = 0;
                // }

                // if (record.SourceClient.Id == 0)
                // {
                //     record.SourceClient.Id = 0;
                // }
                // if (record.SourcePartner.Id == 0)
                // {
                //     record.SourcePartner.Id = 0;
                // }

                _GENERIC_REPO.CollectDeliver.AddAsync(record);

                if (await _GENERIC_REPO.save())
                {
                    CollectDeliver recordDb = await _GENERIC_REPO.CollectDeliver.GetByIdAsync(_id => _id.Id == viewModel.Id);
                    return _MAP.Map<CollectDeliverDto>(record);
                }
                else
                {
                    throw new Exception("Erro desconhecido...");
                }
            }
            catch (Exception ex)
            {
                throw new Exception($"{ex.Message}");
            }
        }


        public async Task<bool> DeleteAsync(int id)
        {
            try
            {
                CollectDeliver record = await _GENERIC_REPO.CollectDeliver.GetByIdAsync(_id => _id.Id == id);
                if (record == null) throw new Exception("O objeto é nulo.");

                _GENERIC_REPO.CollectDeliver.Delete(record);
                return await _GENERIC_REPO.save();
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<CollectDeliverDto> EditAsync(int id, CollectDeliverDto CollectDeliverDto)
        {
            try
            {
                CollectDeliver record = await _GENERIC_REPO.CollectDeliver.GetByIdAsync(_id => _id.Id == id);

                if (record == null) throw new Exception("O objeto é nulo.");

                CollectDeliverDto.Id = record.Id;

                _MAP.Map(CollectDeliverDto, record);

                _GENERIC_REPO.CollectDeliver.UpdateAsync(record);

                if (await _GENERIC_REPO.save())
                {
                    CollectDeliver recordReturn = await _GENERIC_REPO.CollectDeliver.GetByIdAsync(_id => _id.Id == id);
                    return _MAP.Map<CollectDeliverDto>(recordReturn);
                }

                throw new Exception("Erro, objeto não foi atualizado.");
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }


        public async Task<PagedListDto<CollectDeliverDto>> GetAllPagedAsync(PgParams parameters)
        {
            try
            {
                var recordsFromDb = await _GENERIC_REPO.CollectDeliver.GetAllPaged(parameters);

                if (recordsFromDb == null) throw new Exception("O Objeto era nulo.");

                List<CollectDeliverDto> toDto = _MAP.Map<List<CollectDeliverDto>>(recordsFromDb);

                var resultReturn = new PagedListDto<CollectDeliverDto>();
                resultReturn.CurrentPg = recordsFromDb.CurrentPg;
                resultReturn.TotalItems = recordsFromDb.TotalItems;
                resultReturn.TotalPg = recordsFromDb.TotalPg;
                resultReturn.PgSize = recordsFromDb.PgSize;
                resultReturn.HasNext = recordsFromDb.HasNext;
                resultReturn.HasPrevious = recordsFromDb.HasPrevious;
                resultReturn.EntitiesToShow = toDto;

                return resultReturn;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
        public async Task<PagedListDto<CollectDeliverDto>> GetCurrentDatePagedAsync(PgParams parameters)
        {
            try
            {

                PagedList<CollectDeliver> fromDb = await _GENERIC_REPO.CollectDeliver.GetByDateCurrentMonth(parameters);

                if (fromDb == null) throw new Exception("O Objeto era nulo.");

                PagedListDto<CollectDeliverDto> resultPaged = new PagedListDto<CollectDeliverDto>();
                resultPaged.CurrentPg = fromDb.CurrentPg;
                resultPaged.TotalPg = fromDb.TotalPg;
                resultPaged.TotalItems = fromDb.TotalItems;
                resultPaged.HasNext = fromDb.HasNext;
                resultPaged.HasPrevious = fromDb.HasPrevious;
                resultPaged.EntitiesToShow = _MAP.Map<List<CollectDeliverDto>>(fromDb);

                return resultPaged;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
        // public async Task<CollectDeliverDto[]> GetAllAsync()
        // {
        //     try
        //     {
        //         List<CollectDeliver> records = await _GENERIC_REPO.CollectDeliver.GetAllAsync();

        //         if (records == null) throw new Exception("O Objeto era nulo.");

        //         return _MAP.Map<CollectDeliverDto[]>(records);
        //     }
        //     catch (Exception ex)
        //     {
        //         throw new Exception(ex.Message);
        //     }
        // }

        public async Task<CollectDeliverDto> GetByIdAsync(int id)
        {
            try
            {
                CollectDeliver record = await _GENERIC_REPO.CollectDeliver.GetByIdAsync(_id => _id.Id == id);

                if (record == null) throw new Exception("O objeto era nulo");

                return _MAP.Map<CollectDeliverDto>(record);

            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }


        }

        public async Task<PagedListDto<CollectDeliverDto>> GetIntervalDatePagedAsync(PgParams parameters)
        {
            var result = await _GENERIC_REPO.CollectDeliver.GetByIntervalDate(parameters);

            if (result == null) return null;

            List<CollectDeliverDto> ToDto = _MAP.Map<List<CollectDeliverDto>>(result);

            PagedListDto<CollectDeliverDto> resultToReturn = new PagedListDto<CollectDeliverDto>();
            resultToReturn.CurrentPg = result.CurrentPg;
            resultToReturn.TotalItems = result.TotalItems;
            resultToReturn.TotalPg = result.TotalPg;
            resultToReturn.PgSize = result.PgSize;
            resultToReturn.HasNext = result.HasNext;
            resultToReturn.HasPrevious = result.HasPrevious;
            resultToReturn.EntitiesToShow = ToDto;
            return resultToReturn;
        }
    }

}