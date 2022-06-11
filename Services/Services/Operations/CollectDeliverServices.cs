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
        public async Task<CollectDeliverDto> AddAsync(CollectDeliverDto CollectDeliverDto)
        {
            try
            {
                if (CollectDeliverDto == null) throw new Exception("Erro, Objeto era nulo.");

                CollectDeliver record = _MAP.Map<CollectDeliver>(CollectDeliverDto);

                _GENERIC_REPO.CollectDeliver.AddAsync(record);

                if (await _GENERIC_REPO.save())
                {
                    CollectDeliver recordDb = await _GENERIC_REPO.CollectDeliver.GetByIdAsync(_id => _id.Id == CollectDeliverDto.Id);
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

        
        public async Task<CollectDeliverDto[]> GetAllAsync()
        {
            try
            {
                List<CollectDeliver> records = await _GENERIC_REPO.CollectDeliver.GetAllAsync();

                if (records == null) throw new Exception("O Objeto era nulo.");

                return _MAP.Map<CollectDeliverDto[]>(records);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

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
    }

}