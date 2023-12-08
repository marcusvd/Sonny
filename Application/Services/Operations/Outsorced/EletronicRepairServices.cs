using System;
using System.Threading.Tasks;
using AutoMapper;
using UnitOfWork.Persistence.Operations;
using Domain.Entities.Outsourced;
using Application.Services.Operations.Outsourced.Dtos;
using Application.Exceptions;
using Domain.Entities.Outsourced.Enums;

namespace Application.Services.Operations.Outsourced
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
            if (entityDto == null) throw new Exception(GlobalErrorsMessagesException.ObjIsNull);

            ElectronicRepair entityToDb = _MAP.Map<ElectronicRepair>(entityDto);
            entityToDb.EntryDate = DateTime.Now;
            entityToDb.Status = StatusServiceEletronicReparEnum.Evaluating;
            _GENERIC_REPO.ElectronicRepair.Add(entityToDb);

            if (await _GENERIC_REPO.save())
            {
                ElectronicRepair entityFromDb = await _GENERIC_REPO.ElectronicRepair.GetById(
                    _id => _id.Id == entityToDb.Id,
                    null,
                    selector => selector
                    );
                return _MAP.Map<ElectronicRepairDto>(entityFromDb);
            }

            return entityDto;
        }


    }
}
