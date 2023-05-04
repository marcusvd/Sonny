using Domain.Entities;
using Repository.Data.Context;
using Repository.Data.Contracts;
namespace Repository.Data.Operations
{

    public class StockRepository : Repository<Stock>, IStockRepository
    {
        private readonly SonnyDbContext _CONTEXT;
        public StockRepository(SonnyDbContext CONTEXT) : base(CONTEXT)
        {
            _CONTEXT = CONTEXT;
        }
    
    }

}

