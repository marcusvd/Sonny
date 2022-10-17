using System;
using System.Threading.Tasks;
using AutoMapper;
using Services.Services.Contracts;
using UnitOfWork.Persistence.Contracts;
using System.Collections.Generic;
using Services.Dto.ServiceBudgetBench;
using Domain.Entities.BudgetBench;

namespace Services.Services.Operations
{
    public class ServiceBenchServices : IServiceBenchServices
    {
        private readonly IMapper _MAP;
        private readonly IUnitOfWork _GENERIC_REPO;
        public ServiceBenchServices(
                        IMapper MAP,
                        IUnitOfWork GENERIC_REPO
 )
        {
            _MAP = MAP;
            _GENERIC_REPO = GENERIC_REPO;
        }

        public async Task<ServiceBenchDto> AddAsync(ServiceBenchDto record)
        {

            try
            {
                if (record == null) return null;

                ServiceBench recordToDb = _MAP.Map<ServiceBench>(record);

                _GENERIC_REPO.ServicesBench.AddAsync(recordToDb);

                if (await _GENERIC_REPO.save())
                {
                    return _MAP.Map<ServiceBenchDto>(recordToDb);
                }
                return record;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }

        }

        public async Task<List<ServiceBenchDto>> GetAllAsyncIncluded()
        {
            try
            {
                var result = await _GENERIC_REPO.ServicesBench.GetAllAsyncIncluded();

                if (result == null) return null;

                List<ServiceBenchDto> toController = _MAP.Map<List<ServiceBenchDto>>(result);
                return toController;
            }
            catch (Exception ex)
            {
                throw new Exception($"{ex.Message} service layer");
            }
        }



        //     public async Task<List<ServiceBenchDto>> GetAllAsync(bool included = false)
        //           {
        //         try
        //         {
        //             if (included)
        //             {

        //                 List<ServiceBench> recordsIncluded = await _GENERIC_REPO.ServicesBench.GetAllAsyncIncluded();

        //                 if (recordsIncluded == null) throw new Exception("O Objeto era nulo.");

        //                 return _MAP.Map<List<ServiceBenchDto>>(recordsIncluded);
        //             }

        //             List<ServiceBench> records = await _GENERIC_REPO.ServicesBench.GetAllAsync();

        //             if (records == null) throw new Exception("O Objeto era nulo.");

        //             return _MAP.Map<List<ServiceBenchDto>>(records);
        //         }
        //         catch (Exception ex)
        //         {
        //             throw new Exception(ex.Message);
        //         }
        //     }
        //     public async Task<ServiceBenchDto> GetByIdAsync(int id, bool included = false)
        //     {
        //         try
        //         {
        //             if (included)
        //             {
        //                 var recordFromDbIncluded = await _GENERIC_REPO.ServicesBench.GetByIdAsyncIncluded(id);
        //                 if (recordFromDbIncluded == null) throw new Exception("O Objeto era nulo.");
        //                 return _MAP.Map<ServiceBenchDto>(recordFromDbIncluded);
        //             }

        //             ServiceBench recordFromDb = await _GENERIC_REPO.ServicesBench.GetByIdAsync(_id => _id.Id == id);
        //             if (recordFromDb == null) throw new Exception("O Objeto era nulo.");
        //             return _MAP.Map<ServiceBenchDto>(recordFromDb);

        //         }
        //         catch (Exception ex)
        //         {
        //             throw new Exception(ex.Message);
        //         }
        //     }
        //     public async Task<ServiceBenchDto> Update(ServiceBenchDto dtoView)
        //     {
        //         try
        //         {

        //             var fromDb = await _GENERIC_REPO.ServicesBench.GetByIdAsyncIncluded(dtoView.Id);
        //             if (fromDb == null) return null;

        //             var toUpdate = _MAP.Map<ServiceBench>(dtoView);

        //             var toSave = _MAP.Map(toUpdate, fromDb);

        //             _GENERIC_REPO.ServicesBench.UpdateAsync(toSave);

        //             if (await _GENERIC_REPO.save())
        //             {
        //                 var FromDbToReturn = await _GENERIC_REPO.ServicesBench.GetByIdAsync(_id => _id.Id == fromDb.Id); 

        //                 var toReturn = _MAP.Map<ServiceBenchDto>(FromDbToReturn);

        //                 return toReturn;
        //             }

        //             return dtoView;
        //         }
        //         catch (Exception ex)
        //         {
        //             throw new Exception(ex.Message);
        //         }



        //     }
    }
}