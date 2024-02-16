using System.Collections.Generic;
using Repository.Data.Context;
using Repository.Data.Operations.Repository;
using Domain.Entities.Fill.StkProduct;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;

namespace Repository.Data.Operations.ProductRepository
{


    public class ItemFillRepository : Repository<Item>, IItemFillRepository
    {
        private readonly SonnyDbContext _CONTEXT;
        public ItemFillRepository(SonnyDbContext CONTEXT) : base(CONTEXT)
        {
            _CONTEXT = CONTEXT;
        }

        // public async void AddRangeAsync(List<Item> entities)
        // {
        //     await _CONTEXT.PD_Items_Fillers.AddRangeAsync(entities);
        // }
        // public void UpdateRange(List<Item> entities)
        // {
        //      _CONTEXT.PD_Items_Fillers.UpdateRange(entities);
        // }

         public async Task<Item> GetByName(int companyId, string name)
        {
            var result = await _CONTEXT.PD_Items_Fillers.AsNoTracking()
            .Where(x => x.CompanyId == companyId)
            .Include(x => x.Manufacturers)
            .Include(x => x.Segments)
            .SingleOrDefaultAsync(x => x.Name == name);

            return result;
        }



    }

    public class ModelFillRepository : Repository<Model>, IModelFillRepository
    {
        private readonly SonnyDbContext _CONTEXT;
        public ModelFillRepository(SonnyDbContext CONTEXT) : base(CONTEXT)
        {
            _CONTEXT = CONTEXT;
        }

        public async void AddRangeAsync(List<Model> entities)
        {
            await _CONTEXT.PD_Models_Fillers.AddRangeAsync(entities);
        }


    }

    public class ManufacturerFillRepository : Repository<Manufacturer>, IManufacturerFillRepository
    {
        private readonly SonnyDbContext _CONTEXT;
        public ManufacturerFillRepository(SonnyDbContext CONTEXT) : base(CONTEXT)
        {
            _CONTEXT = CONTEXT;
        }

        public async void AddRangeAsync(List<Manufacturer> entities)
        {
            await _CONTEXT.PD_Manufacturers_Fillers.AddRangeAsync(entities);
        }

        // public async Task<int> GetByName(string name)
        // {
        //     var result = await _CONTEXT.PD_Manufacturers_Fillers.SingleOrDefaultAsync(x => x.Name == name);


        //     return result.Id;
        // }




    }

    public class SegmentFillRepository : Repository<Segment>, ISegmentFillRepository
    {
        private readonly SonnyDbContext _CONTEXT;
        public SegmentFillRepository(SonnyDbContext CONTEXT) : base(CONTEXT)
        {
            _CONTEXT = CONTEXT;
        }

        public async void AddRangeAsync(List<Segment> entities)
        {
            await _CONTEXT.PD_Segments_Fillers.AddRangeAsync(entities);
        }


    }

}