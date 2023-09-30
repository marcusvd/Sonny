using System;
using System.Linq;
using System.Threading.Tasks;
using Domain.Entities.Product;
using Microsoft.EntityFrameworkCore;
using Repository.Data.Context;
using System.Collections.Generic;

using Repository.Data.Operations.Repository;
using Pagination.Models;
using Repository.Helpers;

namespace Repository.Data.Operations.Products
{

    public class ProductRepository : Repository<Product>, IProductRepository
    {
        private readonly SonnyDbContext _CONTEXT;
        public ProductRepository(SonnyDbContext CONTEXT) : base(CONTEXT)
        {
            _CONTEXT = CONTEXT;
        }

        public async Task<PagedList<Product>> GetProductsPagedAsync(Params parameters)
        {

            IQueryable<Product> query =
             GetAllPagination().AsNoTracking().OrderBy(x => x.Id)
             .Where(x => x.StockId == parameters.StockId)
             .Include(x => x.Name)
             .Include(x => x.Manufacturer)
             .Include(x => x.Quantities)
             .Include(x => x.Trackings);

            if (String.IsNullOrEmpty(parameters.Term))
            {
                return await PagedList<Product>.ToPagedList(query, parameters.PgNumber, parameters.PgSize);
            }

            if (parameters.Term.Equals("null"))
            {
                return await PagedList<Product>.ToPagedList(query, parameters.PgNumber, parameters.PgSize);
            }

            if (!string.IsNullOrEmpty(parameters.Term))
            {
                query = query.Where(p => p.NormalizedName.Contains(parameters.Term.RemoveAccentsNormalize()));
            }

            return await PagedList<Product>.ToPagedList(query, parameters.PgNumber, parameters.PgSize);
        }

        public async Task<Product> GetProductByIdByStockIdTrakingIncludedAsync(int stockId, int productId)
        {
            var query = await _CONTEXT.PD_Products.AsSplitQuery().Where(x => x.StockId == stockId).AsNoTracking()
                       .Include(x => x.Trackings).SingleOrDefaultAsync(x => x.Id == productId);
            return query;
        }

        public async Task<List<Product>> GetAllByStockIdNameEquipamentIncluded(int id)
        {
            var query = await _CONTEXT.PD_Products.AsNoTracking().Where(x => x.StockId == id)
            .Include(x => x.Name)
            .ToListAsync();

            return query;
        }






        // public async Task<List<Product>> GetAllByStockIdAllIncluded(int id)
        // {
        //     var queryAllIncluded = await _CONTEXT.PD_Products.Where(x => x.StockId == id)
        //     .Include(x => x.Name)
        //     .Include(x => x.Manufacturer)
        //     .Include(x => x.Quantities)
        //     .Include(x => x.Trackings).ToListAsync();

        //     return queryAllIncluded;
        // }
        // public async Task<Product> GetProductByIdByStockIdQuantitiesIncludedAsync(int stockId, int productId)
        // {
        //     var query = await _CONTEXT.PD_Products.AsSplitQuery().Where(x => x.StockId == stockId).AsNoTracking()
        //                .Include(x => x.Quantities).SingleOrDefaultAsync(x => x.Id == productId);
        //     return query;
        // }

        // public async Task<Product> GetByStockIdAllIncluded(int stockId, int productId)
        // {
        //     var query = await _CONTEXT.PD_Products.AsSplitQuery().Where(x => x.StockId == stockId).AsNoTracking()

        //     .Include(x => x.Name)
        //     .Include(x => x.Manufacturer)
        //     // .Include(x => x.Reserveds)
        //     .Include(x => x.Quantities)
        //     .Include(x => x.Trackings).SingleOrDefaultAsync(x => x.Id == productId);

        //     return query;
        // }


    }

}

