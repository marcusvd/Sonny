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
    public class EletronicRepairServices : IEletronicRepairServices
    {
       //private readonly IClientRepository _CLIENT_REPO;
        private readonly IMapper _MAP;
        private readonly IUnitOfWork _GENERIC_REPO;
        public EletronicRepairServices(
                        // IClientRepository CLIENT_REPO,
                         IUnitOfWork GENERIC_REPO,
                         IMapper MAP
                        )
        {
            _MAP = MAP;
            _GENERIC_REPO = GENERIC_REPO;
        }
        public async Task<EletronicRepairDto> AddAsync(EletronicRepairDto recordDto)
        {
            try
            {
                if (recordDto == null) throw new Exception("Erro, Objeto era nulo.");

                EletronicRepair record = _MAP.Map<EletronicRepair>(recordDto);

                _GENERIC_REPO.EletronicRepair.AddAsync(record);

                if (await _GENERIC_REPO.save())
                {
                    EletronicRepair recordDb = await _GENERIC_REPO.EletronicRepair.GetByIdAsync(_id => _id.Id == record.Id);
                    return _MAP.Map<EletronicRepairDto>(record);
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











    }

}