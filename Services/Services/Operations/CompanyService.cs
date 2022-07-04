using System;
using System.Threading.Tasks;
using AutoMapper;
using Services.Dto;
using Services.Services.Contracts;
using Domain.Entities;
using Repository.Data;
using UnitOfWork.Persistence.Contracts;

namespace Services.Services.Operations
{
    public class CompanyService : ICompanyService
    {

        private readonly IMapper _MAP;
        
        private readonly IUnitOfWork _GENERIC_REPO;
        public CompanyService(
                        IMapper MAP,
                        IUnitOfWork GENERIC_REPO
 )
        {
            _MAP = MAP;
            _GENERIC_REPO = GENERIC_REPO;
        }


        public async Task<CompanyDto> AddAsync(CompanyDto record)
        {
            try
            {
                if (record == null) return null;

                Company recordToDb = _MAP.Map<Company>(record);

                _GENERIC_REPO.Companies.AddAsync(recordToDb);

                if (await _GENERIC_REPO.save())
                {
                    return _MAP.Map<CompanyDto>(recordToDb);
                }
                return record;

            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }

        }

        public Task<bool> DeleteAsync(int id)
        {
            throw new System.NotImplementedException();
        }

        public Task<CompanyDto> EditAsync(int id, CompanyDto record)
        {
            throw new System.NotImplementedException();
        }

        public async Task<CompanyDto[]> GetAllAsync(bool include = false)
        {
           try
            {
                var recordToDb = await _GENERIC_REPO.Companies.GetAllAsync();
                
                if (recordToDb == null) return null;


                return _MAP.Map<CompanyDto[]>(recordToDb);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public Task<CompanyDto> GetByIdAsync(int id, bool include = false)
        {
            throw new System.NotImplementedException();
        }
    }
}