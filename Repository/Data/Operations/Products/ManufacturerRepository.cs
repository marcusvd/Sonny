using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain.Entities.Product;
using Pagination.Models;
using Repository.Data.Context;
using Repository.Data.Operations.Repository;
using Repository.Helpers;

namespace Repository.Data.Operations.Products
{
    public class ManufacturerRepository : Repository<Manufacturer>, IManufacturerRepository
    {
        private readonly SonnyDbContext _CONTEXT;
        public ManufacturerRepository(SonnyDbContext CONTEXT) : base(CONTEXT)
        {
            _CONTEXT = CONTEXT;
        }

        public async void AddRangeAsync(List<Manufacturer> entities)
        {
            await _CONTEXT.PD_Manufacturers.AddRangeAsync(entities);
        }

          public async Task<PagedList<Manufacturer>> GetManufacturersPagedAsync(Params parameters)
        {

            IQueryable<Manufacturer> query =
             GetAllPagination().OrderBy(x => x.Id)
             .Where(x => x.CompanyId == parameters.CompanyId);

            if (String.IsNullOrEmpty(parameters.Term))
            {
                return await PagedList<Manufacturer>.ToPagedList(query, parameters.PgNumber, parameters.PgSize);
            }

            if (parameters.Term.Equals("null"))
            {
                return await PagedList<Manufacturer>.ToPagedList(query, parameters.PgNumber, parameters.PgSize);
            }

            if (!string.IsNullOrEmpty(parameters.Term))
            {
                query = query.Where(p => p.NormalizedName.Contains(parameters.Term.RemoveAccentsNormalize()));
            }

            return await PagedList<Manufacturer>.ToPagedList(query, parameters.PgNumber, parameters.PgSize);
        }

    }
}