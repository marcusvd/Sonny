using System;
using System.Threading.Tasks;
using AutoMapper;
using Services.Services.Contracts;
using Domain.Entities;
using UnitOfWork.Persistence.Contracts;
using Domain.Entities.Financial;

namespace Services.Services.Operations.Financial
{
    public class DailyOutServices : IDailyOutServices
    {

        private readonly IMapper _MAP;
        
        private readonly IUnitOfWork _GENERIC_REPO;

        public DailyOutServices(IMapper MAP,
        
        IUnitOfWork GENERIC_REPO)
        {
            _MAP = MAP;
            
            _GENERIC_REPO = GENERIC_REPO;
        }

        public async Task<DailyOutFlowDto> AddAsync<DailyOutFlowDto>(DailyOutFlowDto record)
        {
            try
            {
                if (record == null) throw new Exception("Obj nulo");

                DailyOutFlow ToRecord = _MAP.Map<DailyOutFlow>(record);

                _GENERIC_REPO.Dailyout.AddAsync(ToRecord);

                if (await _GENERIC_REPO.save())
                {
                    DailyOutFlow ToReturn = await _GENERIC_REPO.Dailyout.GetByIdAsync(_id => _id.Id == ToRecord.Id);

                    DailyOutFlowDto ret = _MAP.Map<DailyOutFlowDto>(ToReturn);
                    return ret;

                }
                return record;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
        public async Task<DailyOutFlowDto> GetByIdAsync<DailyOutFlowDto>(int Id )
        {
            try
            {
                DailyOutFlow TrasformToDto = await _GENERIC_REPO.Dailyout.GetByIdAsync(_id => _id.Id == Id);

                if (TrasformToDto == null) throw new Exception("Obj é nullo");

                return _MAP.Map<DailyOutFlowDto>(TrasformToDto);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
        public Task<DailyInFlowDto> EditAsync<DailyInFlowDto>(int Id, DailyInFlowDto record)
        {
            throw new System.NotImplementedException();
        }
        public Task<DailyInFlowDto[]> GetAllAsync<DailyInFlowDto>()
        {
            throw new System.NotImplementedException();
        }
        public Task<bool> Remove<DailyInFlowDto>(int Id)
        {
            throw new System.NotImplementedException();
        }
    }
}