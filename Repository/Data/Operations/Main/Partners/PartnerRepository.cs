using System;
using System.Linq;
using System.Threading.Tasks;
using Domain.Entities;
using Domain.Entities.Main;
using Domain.Entities.Main.Enums;
using Microsoft.EntityFrameworkCore;
using Pagination.Models;
using Repository.Data.Context;
using Repository.Data.Operations.Repository;
using Repository.Helpers;

namespace Repository.Data.Operations.Main.Partners
{
    public class PartnerRepository : Repository<Partner>, IPartnerRepository
    {
        private readonly SonnyDbContext _CONTEXT;
        public PartnerRepository(SonnyDbContext CONTEXT) : base(CONTEXT)
        {
            _CONTEXT = CONTEXT;
        }
        public async Task<PagedList<Partner>> GetAllPartnersPagedAsync(Params parameters)
        {

            IQueryable<Partner> query =
             GetAllPagination().OrderBy(x => x.Id)
             .Where(x => x.CompanyId == parameters.CompanyId);


            if (String.IsNullOrEmpty(parameters.Term))
            {
                return await PagedList<Partner>.ToPagedList(query, parameters.PgNumber, parameters.PgSize);
            }

            if (parameters.Term.Equals("null"))
            {
                return await PagedList<Partner>.ToPagedList(query, parameters.PgNumber, parameters.PgSize);
            }

            if (!string.IsNullOrEmpty(parameters.Term))
            {
                query = query.Where(p => p.NormalizedName.Contains(parameters.Term.RemoveAccentsNormalize()));
            }
            return await PagedList<Partner>.ToPagedList(query, parameters.PgNumber, parameters.PgSize);
        }

        public async Task<int> GetTotalHardwareVendorPartnersByCompanyId(int id)
        {
            var query = await _CONTEXT.MN_Partners
            .Where(x => x.CompanyId == id)
            .Where(x => x.PartnerType == TypePartnerEnum.HardwareSupplier)
            .CountAsync();

            return query;
        }





    }
}