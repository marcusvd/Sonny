using System;
using System.Threading.Tasks;
using AutoMapper;
using Domain.Entities.Financial;
using Services.Services.Contracts;
using UnitOfWork.Persistence.Contracts;

namespace Services.Services.Operations.Financial
{
    public class DailyInServices : IDailyInServices
    {

        private readonly IMapper _MAP;
        // private readonly IDailyInRepository _DAILY_REPO;
        private readonly IUnitOfWork _GENERIC_REPO;

        public DailyInServices(IMapper MAP,
        // IDailyInRepository DAILY_REPO,
        IUnitOfWork GENERIC_REPO)
        {
            _MAP = MAP;
            // _DAILY_REPO = DAILY_REPO;
            _GENERIC_REPO = GENERIC_REPO;
        }

        public async Task<DailyInFlowDto> AddAsync<DailyInFlowDto>(DailyInFlowDto record)
        {
            try
            {
                if (record == null) throw new Exception("Obj nulo");

                DailyInFlow ToRecord = _MAP.Map<DailyInFlow>(record);
                _GENERIC_REPO.Dailyin.AddAsync(ToRecord);

                if (await _GENERIC_REPO.save())
                {
                    DailyInFlowDto ToReturn = _MAP.Map<DailyInFlowDto>(_GENERIC_REPO.Dailyin.GetByIdAsync(_id => _id.Id == ToRecord.Id));
                    return ToReturn;

                }
                return record;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
        public async Task<DailyInFlowDto> GetByIdAsync<DailyInFlowDto>(int Id)
        {
            try
            {
                DailyInFlow TrasFormToDto = await _GENERIC_REPO.Dailyin.GetByIdAsync(_id => _id.Id == Id);

                if (TrasFormToDto == null) throw new Exception("Obj é nullo");

                return _MAP.Map<DailyInFlowDto>(TrasFormToDto);
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