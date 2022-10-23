using System;
using System.Threading.Tasks;
using AutoMapper;
using Domain.Entities.Financial;
using Services.Dto.Financial;
using Services.Services.Contracts.Financial;
using UnitOfWork.Persistence.Contracts;

namespace Services.Services.Operations
{
    public class CardServices : ICardServices
    {

        private readonly IMapper _MAP;
        
        private readonly IUnitOfWork _GENERIC_REPO;
        public CardServices(
                        IMapper MAP,
                        IUnitOfWork GENERIC_REPO
 )
        {
            _MAP = MAP;
            _GENERIC_REPO = GENERIC_REPO;
        }


        public async Task<CardDto> AddAsync(CardDto record)
        {
            try
            {
                if (record == null) return null;

                Card recordToDb = _MAP.Map<Card>(record);

                _GENERIC_REPO.Cards.AddAsync(recordToDb);

                if (await _GENERIC_REPO.save())
                {
                    return _MAP.Map<CardDto>(recordToDb);
                }
                return record;
// _CARD_REPO.GetByIdAsync(, false)
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

        public Task<CardDto> EditAsync(int id, CardDto record)
        {
            throw new System.NotImplementedException();
        }

        public async Task<CardDto[]> GetAllAsync(bool include = false)
        {
           try
            {
                var recordToDb = await _GENERIC_REPO.Cards.GetAllAsync();
                
                if (recordToDb == null) return null;


                return _MAP.Map<CardDto[]>(recordToDb);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public Task<CardDto> GetByIdAsync(int id, bool include = false)
        {
            throw new System.NotImplementedException();
        }
    }
}