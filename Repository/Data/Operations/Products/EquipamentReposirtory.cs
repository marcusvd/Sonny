using System.Collections.Generic;
using System.Threading.Tasks;
using Domain.Entities.Product;
using Repository.Data.Context;
using Repository.Data.Operations.Repository;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using Pagination.Models;
using System;
using Repository.Helpers;

namespace Repository.Data.Operations.Products
{
    public class EquipamentRepository : Repository<EquipamentType>, IEquipamentRepository
    {
        private readonly SonnyDbContext _CONTEXT;
        public EquipamentRepository(SonnyDbContext CONTEXT) : base(CONTEXT)
        {
            _CONTEXT = CONTEXT;
        }

        public async void AddRangeAsync(List<EquipamentType> entities)
        {
            await _CONTEXT.PD_EquipamentTypes.AddRangeAsync(entities);
        }
    
        //   public async Task<Paged<EquipamentType>> GetEquipamentsPagedAsync(Params parameters)
        // {

        //     IQueryable<EquipamentType> query =
        //      GetPaged(parameters, x=> x.CompanyId == parameters.CompanyId)

        //     if (String.IsNullOrEmpty(parameters.Term))
        //     {
        //         return await PagedList<EquipamentType>.ToPagedList(query, parameters.PgNumber, parameters.PgSize);
        //     }

        //     if (parameters.Term.Equals("null"))
        //     {
        //         return await PagedList<EquipamentType>.ToPagedList(query, parameters.PgNumber, parameters.PgSize);
        //     }

        //     if (!string.IsNullOrEmpty(parameters.Term))
        //     {
        //         query = query.Where(p => p.NormalizedName.Contains(parameters.Term.RemoveAccentsNormalize()));
        //     }

        //     return await PagedList<EquipamentType>.ToPagedList(query, parameters.PgNumber, parameters.PgSize);
        // }

    }
}