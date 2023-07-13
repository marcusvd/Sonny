using System.Threading.Tasks;
using Domain.Entities;
using Domain.Entities.Stocks;
using Pagination.Models;
using Repository.Data.Operations.Repository;

namespace Repository.Data.Operations.Stocks
{
    public interface IStockRepository : IRepository<Stock>
    {
     Task<PagedList<Stock>> GetStocksPagedAsync(Params parameters);
    }
}