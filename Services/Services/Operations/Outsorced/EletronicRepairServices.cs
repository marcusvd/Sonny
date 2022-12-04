using System;
using System.Threading.Tasks;
using AutoMapper;
using Services.Services.Contracts.Outsourced;
using Services.Dto;
using UnitOfWork.Persistence.Contracts;
using Domain.Entities.Outsourced;
using Services.Dto.Outsourced;

namespace Services.Services.Operations
{
    public class EletronicRepairServices : IEletronicRepairServices
    {
        private readonly IMapper _MAP;
        private readonly IUnitOfWork _GENERIC_REPO;
        public EletronicRepairServices(
                         IUnitOfWork GENERIC_REPO,
                         IMapper MAP
                        )
        {
            _MAP = MAP;
            _GENERIC_REPO = GENERIC_REPO;
        }
        public async Task<EletronicRepairDto> AddAsync(EletronicRepairDto entityDto)
        {

            EletronicRepair entityToDb = _MAP.Map<EletronicRepair>(entityDto);

            if (entityToDb == null) throw new Exception("Objeto era nulo");

            _GENERIC_REPO.EletronicRepair.AddAsync(entityToDb);

            if (await _GENERIC_REPO.save())
            {
                EletronicRepair entityFromDb = await _GENERIC_REPO.EletronicRepair.GetByIdAsync(_id => _id.Id == entityToDb.Id);
                return _MAP.Map<EletronicRepairDto>(entityFromDb);
            }
            else
            {
                throw new Exception("Erro desconhecido...");
            }
        }
    }
}
