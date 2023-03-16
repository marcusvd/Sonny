using System;
using AutoMapper;
using System.Threading.Tasks;
using Application.Services.Contracts;
using Application.Dto;
using Domain.Entities;
using System.Collections.Generic;
using UnitOfWork.Persistence.Contracts;

namespace Application.Services.Operations
{
    public class PartnerServices : IPartnerServices
    {
        private readonly IMapper _MAP;
        private readonly IUnitOfWork _GENERIC_REPO;
        public PartnerServices(
                         IUnitOfWork GENERIC_REPO,
                         IMapper MAP

                        )
        {
            _MAP = MAP;
            _GENERIC_REPO = GENERIC_REPO;
        }

        public async Task<PartnerDto> AddAsync(PartnerDto entityDto)
        {

            if (entityDto == null) throw new Exception("Objeto era nulo.");

            Partner entityToDb = _MAP.Map<Partner>(entityDto);

            entityToDb.Registered = DateTime.Now;

            _GENERIC_REPO.Partners.AddAsync(entityToDb);

            if (await _GENERIC_REPO.save())
            {
                Partner entityFromoDb = await _GENERIC_REPO.Partners.GetByIdAsync(_id => _id.Id == entityToDb.Id);
                return _MAP.Map<PartnerDto>(entityFromoDb);
            }

            return entityDto;
        }

        public async Task<PartnerDto[]> GetAllAsync()
        {
            List<Partner> entityFromDb = await _GENERIC_REPO.Partners.GetAllAsync();

            if (entityFromDb == null) throw new Exception("Objeto era nulo.");

            return _MAP.Map<PartnerDto[]>(entityFromDb);
        }

    }

}