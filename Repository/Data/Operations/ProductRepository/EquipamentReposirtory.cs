using System.Collections.Generic;
using System.Threading.Tasks;
using Domain.Entities.StkProduct;
using Repository.Data.Context;
using Repository.Data.Operations.Repository;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using Pagination.Models;
using System;
using Repository.Helpers;

namespace Repository.Data.Operations.ProductRepository
{
    public class EquipamentRepository : Repository<Equipament>, IEquipamentRepository
    {
        private readonly SonnyDbContext _CONTEXT;
        public EquipamentRepository(SonnyDbContext CONTEXT) : base(CONTEXT)
        {
            _CONTEXT = CONTEXT;
        }

        public async void AddRangeAsync(List<Equipament> entities)
        {
            await _CONTEXT.PD_Equipaments.AddRangeAsync(entities);
        }
    
        //   public async Task<Paged<Equipament>> GetEquipamentsPagedAsync(Params parameters)
        // {

        //     IQueryable<Equipament> query =
        //      GetPaged(parameters, x=> x.CompanyId == parameters.CompanyId)

        //     if (String.IsNullOrEmpty(parameters.Term))
        //     {
        //         return await PagedList<Equipament>.ToPagedList(query, parameters.PgNumber, parameters.PgSize);
        //     }

        //     if (parameters.Term.Equals("null"))
        //     {
        //         return await PagedList<Equipament>.ToPagedList(query, parameters.PgNumber, parameters.PgSize);
        //     }

        //     if (!string.IsNullOrEmpty(parameters.Term))
        //     {
        //         query = query.Where(p => p.XXXX.Contains(parameters.Term.RemoveAccentsNormalize()));
        //     }

        //     return await PagedList<Equipament>.ToPagedList(query, parameters.PgNumber, parameters.PgSize);
        // }

    }
}