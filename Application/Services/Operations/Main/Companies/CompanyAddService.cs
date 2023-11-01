using System;
using System.Threading.Tasks;
using AutoMapper;
using UnitOfWork.Persistence.Operations;
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

            _GENERIC_REPO.Companies.Add(entityConvertedToDb);

            if (await _GENERIC_REPO.save())
            {
                var entityFromDb = _GENERIC_REPO.Companies.GetById(x => x.Id == entityConvertedToDb.Id);
                return _MAP.Map<CompanyDto>(entityFromDb);
            }
            return entityDto;

        }
    }
}