using System;
using System.Threading.Tasks;
using AutoMapper;
using Services.Services.Contracts;
using UnitOfWork.Persistence.Contracts;
using System.Collections.Generic;
using Services.Dto.ServiceBudgetBench;
using Domain.Entities.BudgetBench;


namespace Services.Services.Operations.ServiceBudgetBench
{
    public class SolutionsPricesServices : ISolutionsPricesServices
    {

        private readonly IMapper _MAP;

        private readonly IUnitOfWork _GENERIC_REPO;
        public SolutionsPricesServices(
                        IMapper MAP,
                        IUnitOfWork GENERIC_REPO
 )
        {
            _MAP = MAP;
            _GENERIC_REPO = GENERIC_REPO;
        }

        public Task<bool> DeleteAsync(int id)
        {
            try
            {
                _GENERIC_REPO.SolutionsPrices.DeleteAsync(id);
                return _GENERIC_REPO.save();
        
            }
            catch (Exception ex)
            {
                throw new Exception($"{ex} service layer" );
            }
        }
    }
}