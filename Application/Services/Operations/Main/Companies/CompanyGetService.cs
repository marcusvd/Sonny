using System;
using System.Threading.Tasks;
using AutoMapper;
using UnitOfWork.Persistence.Contracts;
using Domain.Entities.Main.Companies;
using Application.Services.Operations.Main.Companies.Dtos;

namespace Application.Services.Operations.Main.Companies
{
    public class CompanyGetService : ICompanyGetService
    {

        private readonly IMapper _MAP;
        private readonly IUnitOfWork _GENERIC_REPO;
        public CompanyGetService(
                        IMapper MAP,
                        IUnitOfWork GENERIC_REPO)
        {
            _MAP = MAP;
            _GENERIC_REPO = GENERIC_REPO;
        }
        public async Task<CompanyDto> GetByIdStockIncludedAsync(int id)
        {
            var entityFromDb = await _GENERIC_REPO.Companies.GetByIdStockIncludedAsync(id);

            if (entityFromDb == null) throw new Exception("Objeto era nulo.");

            return _MAP.Map<CompanyDto>(entityFromDb);
        }

        public async Task<CompanyDto[]> GetAllAsync()
        {
            var entityFromDb = await _GENERIC_REPO.Companies.GetAllAsync();

            if (entityFromDb == null) throw new Exception("Objeto era nulo.");

            return _MAP.Map<CompanyDto[]>(entityFromDb);
        }



    }
}