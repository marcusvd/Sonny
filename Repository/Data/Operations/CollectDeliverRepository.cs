using System.Threading.Tasks;
using Domain.Entities;
using Repository.Data.Context;
using Repository.Data.Contracts;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Collections.Generic;
using Pagination;
using System;
using System.Globalization;

namespace Repository.Data.Operations
{
    public class CollectDeliverRepository : Repository<CollectDeliver>, ICollectDeliverRepository
    {

        private readonly SonnyDbContext _CONTEXT;
        public CollectDeliverRepository(SonnyDbContext CONTEXT) : base(CONTEXT)
        {
            _CONTEXT = CONTEXT;
        }

        public async Task<CollectDeliver> GetByIdIncluded(int id)
        {
            // var result = await _CONTEXT.CollectsDelivers.AsNoTracking()
            // .Include(x => x.DestinyAddress)
            // .Include(x => x.SourceAddress)
            // .Include(x => x.Transporter).FirstOrDefaultAsync(x => x.Id == id);

            return null;
        }

        public async Task<PagedList<CollectDeliver>> GetByIntervalDate(PgParams parameters)
        {
            DateTime _start = Convert.ToDateTime(parameters.Start);
            DateTime _end = Convert.ToDateTime(parameters.End);

            IQueryable<CollectDeliver> result = GetAllPagination()
            //Source
            .Include(x => x.SourceCompany)
            .Include(x => x.SourceCustomer)
            .Include(x => x.SourcePartner)
            //Destiny,
            .Include(x => x.DestinyCompany)
            .Include(x => x.DestinyCustomer)
            .Include(x => x.DestinyPartner)
            .Include(x => x.Transporter);


            if (parameters.Start != null && parameters.End != null)
            {
                result = result.Where(x => x.Start >= _start && x.Start <= _end).OrderBy(d => d.Start);
            }

            // .Skip((parameters.PgNumber - 1) * parameters.PgSize)
            // .Take(parameters.PgSize);

            return await PagedList<CollectDeliver>.ToPagedList(result, parameters.PgNumber, parameters.PgSize);
        }

        public async Task<PagedList<CollectDeliver>> GetByDateCurrentMonth(PgParams parameters)
        {
            DateTime CurrentDate = DateTime.Now;

            var result = GetAllPagination()
            //Source
            .Include(x => x.SourceCompany)

            .Include(x => x.SourceCustomer)
            .ThenInclude(x => x.Address)
            .Include(x => x.SourceCustomer)
            .ThenInclude(x => x.Contact.socialnetworks)
            .Include(x => x.SourcePartner)
            .ThenInclude(x => x.Address)
            .Include(x => x.SourcePartner)
            .ThenInclude(x => x.Contact.socialnetworks)

            //Destiny,
            .Include(x => x.DestinyCompany)

            .Include(x => x.DestinyCustomer)
            .ThenInclude(x => x.Address)
            .Include(x => x.DestinyCustomer)
            .ThenInclude(x => x.Contact.socialnetworks)
            .Include(x => x.DestinyPartner)
            .ThenInclude(x => x.Address)
            .Include(x => x.DestinyPartner)
            .ThenInclude(x => x.Contact.socialnetworks)

            .Include(x => x.Transporter)
            .ThenInclude(x => x.Address)
            .Include(x => x.Transporter)
            .ThenInclude(x => x.Contact.socialnetworks)


            .Where(x => x.Start.Month == CurrentDate.Month);

            // .Skip((parameters.PgNumber - 1) * parameters.PgSize)
            // .Take(parameters.PgSize);

            return await PagedList<CollectDeliver>.ToPagedList(result, parameters.PgNumber, parameters.PgSize);

        }

        public async Task<PagedList<CollectDeliver>> GetAllPaged(PgParams parameters)
        {
            IQueryable<CollectDeliver> result = _CONTEXT.CollectsDelivers.AsNoTracking()

         .Include(x => x.SourceCustomer)
         .Include(x => x.SourceCompany)
         .Include(x => x.SourcePartner)
         .Include(x => x.DestinyCustomer)
         .Include(x => x.DestinyCompany)
         .Include(x => x.DestinyPartner)
         .Include(x => x.Transporter);

            return await PagedList<CollectDeliver>.ToPagedList(result, parameters.PgNumber, parameters.PgSize);


        }
    }
}