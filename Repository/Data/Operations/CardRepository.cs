using Domain.Entities;
using Repository.Data.Context;
using Repository.Data.Contracts;

namespace Repository.Data.Operations
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