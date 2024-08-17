using System.Collections.Generic;
using Domain.Entities.Main;
using Repository.Data.Context;
using Repository.Data.Operations.Repository;

namespace Repository.Data.Operations.Main.Partners
{
    public class PartnerRepository : Repository<Partner>, IPartnerRepository
    {
        private readonly SonnyDbContext _CONTEXT;
        public PartnerRepository(SonnyDbContext CONTEXT) : base(CONTEXT)
        {
            _CONTEXT = CONTEXT;
        }
        public async void AddRangeAsync(List<Partner> entities)
        {
            await _CONTEXT.MN_Partners.AddRangeAsync(entities);
        }
        // public Task<List<Partner>> GetAllEletronicRepairAsync(int companyId)
        // {
        //    var query = _CONTEXT.MN_Partners.Where(x => x.CompanyId == companyId).Where(x => x.PartnerType == TypePartnerEnum.ElectronicRepair)
        //    .AsNoTracking().ToListAsync();

        //    return query;
        // }

        //  public async Task<List<Partner>> GetAllHardwareVendorByCompanyIdAsync(int id)
        // {
        //     var query = await _CONTEXT.MN_Partners
        //     .Where(x => x.CompanyId == id)
        //     .Where(x => x.PartnerType == TypePartnerEnum.HardwareSupplier)
        //     .ToListAsync();
        //     return query;
        // }


        // public async Task<PagedList<Partner>> GetAllPartnersPagedAsync(Params parameters)
        // {

        //     IQueryable<Partner> query =
        //      GetAllPagination().OrderBy(x => x.Id)
        //      .Where(x => x.CompanyId == parameters.CompanyId);


        //     if (String.IsNullOrEmpty(parameters.Term))
        //     {
        //         return await PagedList<Partner>.ToPagedList(query, parameters.PgNumber, parameters.PgSize);
        //     }

        //     if (parameters.Term.Equals("null"))
        //     {
        //         return await PagedList<Partner>.ToPagedList(query, parameters.PgNumber, parameters.PgSize);
        //     }

        //     if (!string.IsNullOrEmpty(parameters.Term))
        //     {
        //         query = query.Where(p => p.XXXX.Contains(parameters.Term.RemoveAccentsNormalize()));
        //     }
        //     return await PagedList<Partner>.ToPagedList(query, parameters.PgNumber, parameters.PgSize);
        // }

        // public async Task<int> GetTotalHardwareVendorByCompanyIdAsync(int id)
        // {
        //     var query = await _CONTEXT.MN_Partners
        //     .Where(x => x.CompanyId == id)
        //     .Where(x => x.PartnerType == TypePartnerEnum.HardwareSupplier)
        //     .CountAsync();

        //     return query;
        // }





    }
}