using System;
using System.Threading.Tasks;
using AutoMapper;
using UnitOfWork.Persistence.Contracts;
using Domain.Entities.Outsourced;
using Application.Dto.Outsourced;
using Application.Services.Contracts.Outsourced;

namespace Application.Services.Operations
{
    public class ElectronicRepairServices : IElectronicRepairServices
    {
        private readonly IMapper _MAP;
        private readonly IUnitOfWork _GENERIC_REPO;
        public ElectronicRepairServices(
                         IUnitOfWork GENERIC_REPO,
                         IMapper MAP
                        )
        {
            _MAP = MAP;
            _GENERIC_REPO = GENERIC_REPO;
        }
        public async Task<ElectronicRepairDto> AddAsync(ElectronicRepairDto entityDto)
        {
            if (entityDto == null) throw new Exception("Objeto era nulo.");

            ElectronicRepair entityToDb = _MAP.Map<ElectronicRepair>(entityDto);

            _GENERIC_REPO.ElectronicRepair.AddAsync(entityToDb);

            if (await _GENERIC_REPO.save())
            {
                ElectronicRepair entityFromDb = await _GENERIC_REPO.ElectronicRepair.GetByIdAsync(_id => _id.Id == entityToDb.Id);
                return _MAP.Map<ElectronicRepairDto>(entityFromDb);
            }
            else
            {
                throw new Exception("Erro desconhecido...");
            }
        }
    }
}
