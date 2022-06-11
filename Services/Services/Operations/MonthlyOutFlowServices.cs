using System;
using System.Threading.Tasks;
using AutoMapper;
using Services.Dto;
using Services.Services.Contracts;
using Domain.Entities;
using Repository.Data.Operations;
using Repository.Data.Contracts;
using UnitOfWork.Persistence.Contracts;

namespace Services.Services.Operations
{
    public class MonthlyOutFlowServices : IMonthlyOutFlowServices
    {

        // private readonly IMonthlyOutFlowRepository _MONTHLY_REPO;
        private readonly IUnitOfWork _GENERIC_REPO;
        private readonly IMapper _MAP;
        public MonthlyOutFlowServices(
            // IMonthlyOutFlowRepository MONTHLY_REPO,
            IUnitOfWork GENERIC_REPO,
            IMapper MAP
            )
        {
            // _MONTHLY_REPO = MONTHLY_REPO;
            _GENERIC_REPO = GENERIC_REPO;
            _MAP = MAP;
        }
        public async Task<MonthlyOutFlowDto> AddAsync(MonthlyOutFlowDto record)
        {
            try
            {
                MonthlyOutFlow ToRecord = _MAP.Map<MonthlyOutFlow>(record);

                if (ToRecord == null) throw new Exception("Obj Nulo");
                _GENERIC_REPO.Monthlyout.AddAsync(ToRecord);
                if (await _GENERIC_REPO.save())
                {
                    MonthlyOutFlow toReturn = await _GENERIC_REPO.Monthlyout.GetByIdAsync(_id => _id.Id == ToRecord.Id);
                    return _MAP.Map<MonthlyOutFlowDto>(toReturn);
                }
                return record;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }

        }

        public Task<MonthlyOutFlowDto> EditAsync(int Id, MonthlyOutFlowDto record)
        {
            throw new System.NotImplementedException();
        }

        public Task<MonthlyOutFlowDto[]> GetAllAsync()
        {
            throw new System.NotImplementedException();
        }

        public Task<MonthlyOutFlowDto> GetByIdAsync(int Id)
        {
            throw new System.NotImplementedException();
        }

        public Task<MonthlyOutFlowDto> Remove(int Id)
        {
            throw new System.NotImplementedException();
        }
    }
}