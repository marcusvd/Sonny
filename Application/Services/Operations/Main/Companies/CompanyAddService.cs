using System;
using System.Threading.Tasks;
using AutoMapper;
using UnitOfWork.Persistence.Contracts;
using Domain.Entities.Main.Companies;
using Application.Services.Operations.Main.Companies.Dtos;

namespace Application.Services.Operations.Main.Companies
{
    public class CompanyAddService : ICompanyAddService
    {

        private readonly IMapper _MAP;
        private readonly IUnitOfWork _GENERIC_REPO;
        public CompanyAddService(
                        IMapper MAP,
                        IUnitOfWork GENERIC_REPO)
        {
            _MAP = MAP;
            _GENERIC_REPO = GENERIC_REPO;
        }


        public async Task<CompanyDto> AddAsync(CompanyDto entityDto)
        {
            if (entityDto == null) throw new Exception("Objeto era nulo.");

            Company entityConvertedToDb = _MAP.Map<Company>(entityDto);

            _GENERIC_REPO.Companies.AddAsync(entityConvertedToDb);

            if (await _GENERIC_REPO.save())
            {
                var entityFromDb = _GENERIC_REPO.Companies.GetByIdAsync(x => x.Id == entityConvertedToDb.Id);
                return _MAP.Map<CompanyDto>(entityFromDb);
            }
            return entityDto;

        }

        public async Task<CompanyDto[]> GetAllAsync()
        {
                var entityFromDb = await _GENERIC_REPO.Companies.GetAllAsync();

                if (entityFromDb == null) throw new Exception("Objeto era nulo.");

                return _MAP.Map<CompanyDto[]>(entityFromDb);
        }


    }
}