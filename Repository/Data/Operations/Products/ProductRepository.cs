using System;
using System.Linq;
using System.Threading.Tasks;
using Domain.Entities.Stocks;
using Microsoft.EntityFrameworkCore;
using Repository.Data.Context;
using System.Collections.Generic;

using Repository.Data.Operations.Repository;

namespace Repository.Data.Operations.Products
{

    public class ProductRepository : Repository<Product>, IProductRepository
    {
        private readonly SonnyDbContext _CONTEXT;
        public ProductRepository(SonnyDbContext CONTEXT) : base(CONTEXT)
        {
            _CONTEXT = CONTEXT;
        }

        public async Task<List<Product>> GetAllByStockIdAllIncluded(int id)
        {
            var queryAllIncluded = await _CONTEXT.PD_Products.Where(x => x.StockId == id)
            .Include(x => x.Name)
            .Include(x => x.Manufacturer)
            .Include(x => x.Quantities)
            .Include(x => x.Trackings).ToListAsync();

            return queryAllIncluded;
        }

        public async Task<Product> GetByStockIdAllIncluded(int stockId, int productId)
        {
            var query = await _CONTEXT.PD_Products.AsSplitQuery().Where(x => x.StockId == stockId).AsNoTracking()

            .Include(x => x.Name)
            .Include(x => x.Manufacturer)
            // .Include(x => x.Reserveds)
            .Include(x => x.Quantities)
            .Include(x => x.Trackings).SingleOrDefaultAsync(x => x.Id == productId);

            return query;
        }

        public async Task<Product> GetProductByIdByStockIdTrakingIncludedAsync(int stockId, int productId)
        {
            var query = await _CONTEXT.PD_Products.AsSplitQuery().Where(x => x.StockId == stockId).AsNoTracking()
                       .Include(x => x.Trackings).SingleOrDefaultAsync(x => x.Id == productId);
            return  query;
        }
        public async Task<Product> GetProductByIdByStockIdQuantitiesIncludedAsync(int stockId, int productId)
        {
            var query = await _CONTEXT.PD_Products.AsSplitQuery().Where(x => x.StockId == stockId).AsNoTracking()
                       .Include(x => x.Quantities).SingleOrDefaultAsync(x => x.Id == productId);
            return  query;
        }

        public async Task<bool> save()
        {
            return await _CONTEXT.SaveChangesAsync() > 0;
        }

        // public async Task<int> GetQuantity(string equipament)
        // {
        //     var EquipamentByType = _CONTEXT.PD_Products
        //     .Where(x => x.Equipament.Name.Equals(equipament));

        //     var productHistories = EquipamentByType.SelectMany(x => x.ProductHistories);

        //     var amount = productHistories.Where(x => x.SoldDate == DateTime.MinValue);

        //    return await amount.CountAsync();

        // }



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

