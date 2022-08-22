using System;
using System.Threading.Tasks;
using AutoMapper;
using Services.Dto;
using Services.Services.Contracts;
using Domain.Entities;
using Repository.Data;
using UnitOfWork.Persistence.Contracts;
using System.Collections.Generic;

namespace Services.Services.Operations
{
    public class ServiceBudgetServices : IServiceBudgetServices
    {

        private readonly IMapper _MAP;

        private readonly IUnitOfWork _GENERIC_REPO;
        public ServiceBudgetServices(
                        IMapper MAP,
                        IUnitOfWork GENERIC_REPO
 )
        {
            _MAP = MAP;
            _GENERIC_REPO = GENERIC_REPO;
        }

        public async Task<ServiceBudgetDto> AddAsync(ServiceBudgetDto record)
        {

            try
            {
                if (record == null) return null;

                ServiceBudget recordToDb = _MAP.Map<ServiceBudget>(record);

                _GENERIC_REPO.ServiceBudget.AddAsync(recordToDb);

                if (await _GENERIC_REPO.save())
                {
                    return _MAP.Map<ServiceBudgetDto>(recordToDb);
                }
                return record;
                // _CARD_REPO.GetByIdAsync(, false)
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }

        }
        public async Task<List<ServiceBudgetDto>> GetAllAsync(bool included = false)
              {
            try
            {
                if (included)
                {

                    List<ServiceBudget> recordsIncluded = await _GENERIC_REPO.ServiceBudget.GetAllAsyncIncluded();

                    if (recordsIncluded == null) throw new Exception("O Objeto era nulo.");

                    return _MAP.Map<List<ServiceBudgetDto>>(recordsIncluded);
                }

                List<ServiceBudget> records = await _GENERIC_REPO.ServiceBudget.GetAllAsync();

                if (records == null) throw new Exception("O Objeto era nulo.");

                return _MAP.Map<List<ServiceBudgetDto>>(records);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
        public async Task<ServiceBudgetDto> GetByIdAsync(int id, bool included = false)
        {
            try
            {
                if (included)
                {
                    var recordFromDbIncluded = await _GENERIC_REPO.ServiceBudget.GetByIdAsyncIncluded(id);
                    if (recordFromDbIncluded == null) throw new Exception("O Objeto era nulo.");
                    return _MAP.Map<ServiceBudgetDto>(recordFromDbIncluded);
                }

                ServiceBudget recordFromDb = await _GENERIC_REPO.ServiceBudget.GetByIdAsync(_id => _id.Id == id);
                if (recordFromDb == null) throw new Exception("O Objeto era nulo.");
                return _MAP.Map<ServiceBudgetDto>(recordFromDb);

            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
        public async Task<ServiceBudgetDto> Update(ServiceBudgetDto dtoView)
        {
            try
            {

                var fromDb = await _GENERIC_REPO.ServiceBudget.GetByIdAsyncIncluded(dtoView.Id);
                if (fromDb == null) return null;

                var toUpdate = _MAP.Map<ServiceBudget>(dtoView);

                var toSave = _MAP.Map(toUpdate, fromDb);

                _GENERIC_REPO.ServiceBudget.UpdateAsync(toSave);

                if (await _GENERIC_REPO.save())
                {
                    var FromDbToReturn = await _GENERIC_REPO.ServiceBudget.GetByIdAsync(_id => _id.Id == fromDb.Id); 

                    var toReturn = _MAP.Map<ServiceBudgetDto>(FromDbToReturn);

                    return toReturn;
                }
 
                return dtoView;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }



        }
    }
}