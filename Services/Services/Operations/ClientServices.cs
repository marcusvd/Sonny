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
    public class ClientServices : IClientServices
    {
        //private readonly IClientRepository _CLIENT_REPO;
        private readonly IMapper _MAP;
        private readonly IUnitOfWork _GENERIC_REPO;
        public ClientServices(
                         // IClientRepository CLIENT_REPO,
                         IUnitOfWork GENERIC_REPO,
                         IMapper MAP
                        )
        {
            _MAP = MAP;
            _GENERIC_REPO = GENERIC_REPO;
        }
        public async Task<ClientDto> AddAsync(ClientDto clientDto)
        {
            try
            {
                if (clientDto == null) throw new Exception("Erro, Objeto era nulo.");

                ClientEntity record = _MAP.Map<ClientEntity>(clientDto);

                _GENERIC_REPO.Clients.AddAsync(record);

                if (await _GENERIC_REPO.save())
                {
                    ClientEntity recordDb = await _GENERIC_REPO.Clients.GetByIdAsync(_id => _id.Id == clientDto.Id);
                    return _MAP.Map<ClientDto>(record);
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
                ClientEntity record = await _GENERIC_REPO.Clients.GetByIdAsync(_id => _id.Id == id);
                if (record == null) throw new Exception("O objeto é nulo.");

                _GENERIC_REPO.Clients.Delete(record);
                return await _GENERIC_REPO.save();
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<ClientDto> EditAsync(int id, ClientDto clientDto)
        {
            try
            {
                ClientEntity record = await _GENERIC_REPO.Clients.GetByIdAsync(_id => _id.Id == id);

                if (record == null) throw new Exception("O objeto é nulo.");

                clientDto.Id = record.Id;

                _MAP.Map(clientDto, record);

                _GENERIC_REPO.Clients.UpdateAsync(record);

                if (await _GENERIC_REPO.save())
                {
                    ClientEntity recordReturn = await _GENERIC_REPO.Clients.GetByIdAsync(_id => _id.Id == id);
                    return _MAP.Map<ClientDto>(recordReturn);
                }

                throw new Exception("Erro, objeto não foi atualizado.");
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<List<ClientDto>> GetAllAsync()
        {
            try
            {
                List<ClientEntity> records = await _GENERIC_REPO.Clients.GetAllAsync();

                if (records == null) throw new Exception("O Objeto era nulo.");

                return _MAP.Map<List<ClientDto>>(records);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public async Task<ClientDto> GetByIdAsync(int id)
        {
            try
            {
                ClientEntity record = await _GENERIC_REPO.Clients.GetByIdAsync(_id => _id.Id == id);

                if (record == null) throw new Exception("O objeto era nulo");

                return _MAP.Map<ClientDto>(record);

            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }


        }

        public async Task<List<ClientDto>> GetAllIncludedAsync()
        {
            try
            {
                List<ClientEntity> records = await _GENERIC_REPO.Clients.GetAllIncludedAsync();

                if (records == null) throw new Exception("O Objeto era nulo.");

                return _MAP.Map<List<ClientDto>>(records);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

    }

}