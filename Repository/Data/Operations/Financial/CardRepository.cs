using Domain.Entities;
using Domain.Entities.Financial;
using Repository.Data.Context;
using Repository.Data.Contracts;
using Repository.Data.Contracts.Financial;

namespace Repository.Data.Operations.Financial
{
    public class CardRepository : Repository<Card>,ICardRepository
    {
        private  SonnyDbContext _CONTEXT;
        public CardRepository(SonnyDbContext CONTEXT):base(CONTEXT)
        {
            _CONTEXT = CONTEXT;
        }

     
    }
}