using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain.Entities.StkProduct;
using Microsoft.EntityFrameworkCore;
using Pagination.Models;
using Repository.Data.Context;
using Repository.Data.Operations.Repository;

namespace Repository.Data.Operations.ProductRepository.QuantitiesRepository
{
    public class QuantitiesProductRepository : Repository<Quantity>, IQuantitiesProductRepository
    {
        private readonly SonnyDbContext _context;
        public QuantitiesProductRepository(SonnyDbContext context) : base(context)
        {
            _context = context;
        }

        public async Task<List<Quantity>> GetMultplesById(List<int> listIds)
        {

            List<Quantity> toReturn = new();

            List<Quantity> fromDb = await _context.PD_Quantities.AsNoTracking().ToListAsync();

            fromDb.ForEach(x =>
            {
                listIds.ForEach(xy =>
                {
                    if (x.Id == xy)
                        toReturn.Add(x);
                });
            });

            if (listIds.Count() == toReturn.Count())
                return toReturn;

            return null;

        }

        public async Task<Page<Quantity>> GetPaged(Params parameters)
        {
            IQueryable<Quantity> fromDb = _context.PD_Quantities
            .Where(x => x.ProductId == parameters.predicate).AsNoTracking();

            if (parameters.Term != null)
                fromDb = fromDb.Where(x => x.NfNumber.ToLower() == parameters.Term.ToLower());
            
            DateTime minValue = DateTime.MinValue;

            fromDb = fromDb.Where(x => x.IsReserved == minValue && x.SoldDate == minValue);

            return await Page<Quantity>.ToPagedList(fromDb, parameters.PgNumber, parameters.PgSize, selector => selector);
        }

        public void UpdateRange(List<Quantity> entities)
        {
            var toSave = entities.AsEnumerable();
            _context.PD_Quantities.UpdateRange(toSave);
        }
    }


}