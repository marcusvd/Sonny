using System;
using System.Threading.Tasks;
using Domain.Entities.Stocks;
using Pagination.Models;
using Repository.Data.Context;
using Repository.Data.Operations.Repository;

namespace Repository.Data.Operations.Stocks
{

    public class StockRepository : Repository<Stock>, IStockRepository
    {
        private readonly SonnyDbContext _CONTEXT;
        public StockRepository(SonnyDbContext CONTEXT) : base(CONTEXT)
        {
            _CONTEXT = CONTEXT;
        }

        public Task<PagedList<Stock>> GetStocksPagedAsync(Params parameters)
        {
            throw new NotImplementedException();
        }


        // public async Task<PagedList<Stock>> GetStocksPagedAsync(Params parameters)
        // {

        //     IQueryable<Stock> query =
        //      GetAllPagination().OrderBy(x => x.Id)
        //      .Where(x => x.CompanyId == parameters.CompanyId);


        //     if (String.IsNullOrEmpty(parameters.Term))
        //     {
        //         return await PagedList<Stock>.ToPagedList(query, parameters.PgNumber, parameters.PgSize);
        //     }

        //     if (parameters.Term.Equals("null"))
        //     {
        //         return await PagedList<Stock>.ToPagedList(query, parameters.PgNumber, parameters.PgSize);
        //     }

        //     if (!string.IsNullOrEmpty(parameters.Term))
        //     {
        //         query = query.Where(p => p.NormalizedName.Contains(parameters.Term.RemoveAccentsNormalize()));
        //     }
        //     return await PagedList<Stock>.ToPagedList(query, parameters.PgNumber, parameters.PgSize);
        // }


    }

}

