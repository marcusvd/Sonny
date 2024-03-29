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
    public class TrackingRepository : Repository<Tracking>, ITrackingRepository
    {
        private readonly SonnyDbContext _context;
        public TrackingRepository(SonnyDbContext context) : base(context)
        {
            _context = context;
        }

        public async void AddRangeAsync(List<Tracking> entities)
        {
            await _context.PD_Trackings.AddRangeAsync(entities);
        }
    }


}