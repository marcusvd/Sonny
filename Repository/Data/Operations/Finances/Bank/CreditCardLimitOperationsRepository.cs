using Repository.Data.Context;
using Domain.Entities.Finances;
using Repository.Data.Operations.Repository;
using Domain.Entities.Finances.Bank;
using System.Collections.Generic;

namespace Repository.Data.Operations.Finances
{
    public class CreditCardLimitOperationsRepository : Repository<CreditCardLimitOperation>, ICreditCardLimitOperationsRepository
    {
        private readonly SonnyDbContext _CONTEXT;
        public CreditCardLimitOperationsRepository(SonnyDbContext CONTEXT) : base(CONTEXT)
        {
            _CONTEXT = CONTEXT;
        }
         public async void AddRangeAsync(List<CreditCardLimitOperation> entities)
        {
            await _CONTEXT.FN_CreditCardLimitOperations.AddRangeAsync(entities);
        }
    }
}