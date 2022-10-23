using System;
using System.Threading.Tasks;
using AutoMapper;
using Services.Services.Contracts;
using UnitOfWork.Persistence.Contracts;
using System.Collections.Generic;
using Services.Dto.Financial;
using Domain.Entities.Financial;
using Services.Services.Contracts.Financial;

namespace Services.Services.Operations.Financial
{
    public class CheckingAccountServices : ICheckingAccountServices
    {
        private readonly IMapper _MAP;

        private readonly IUnitOfWork _GENERIC_REPO;

        public CheckingAccountServices(

            IUnitOfWork GENERIC_REPO,
            IMapper MAP
            )
        {
            _GENERIC_REPO = GENERIC_REPO;
            _MAP = MAP;
        }


        public async Task<CheckingAccountDto> AddAsync(CheckingAccountDto record)
        {
            try
            {

                var recordToDb = _MAP.Map<CheckingAccount>(record);

                _GENERIC_REPO.Checkingaccounts.AddAsync(recordToDb);

                if (await _GENERIC_REPO.save())
                {
                    CheckingAccount result = await _GENERIC_REPO.Checkingaccounts.GetByIdAsync(_id => _id.Id == recordToDb.Id);

                    return _MAP.Map<CheckingAccountDto>(result);
                }

                return record;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }

        }


        public async Task<CheckingAccountDto[]> GetAllAsync(bool include = false)
        {
            try
            {
                List<CheckingAccount> recordToDb = await _GENERIC_REPO.Checkingaccounts.GetAllAsync();

                if (recordToDb == null) return null;


                return _MAP.Map<CheckingAccountDto[]>(recordToDb);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
    }
}