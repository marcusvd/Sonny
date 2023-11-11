using System.Collections.Generic;
using Repository.Data.Context;
using Repository.Data.Operations.Repository;
using Domain.Entities.Fill.StkProduct;

namespace Repository.Data.Operations.ProductRepository
{
    public class EquipamentFillRepository : Repository<Equipament_Fill>, IEquipamentFillRepository
    {
        private readonly SonnyDbContext _CONTEXT;
        public EquipamentFillRepository(SonnyDbContext CONTEXT) : base(CONTEXT)
        {
            _CONTEXT = CONTEXT;
        }

        public async void AddRangeAsync(List<Equipament_Fill> entities)
        {
            await _CONTEXT.PD_Equipament_Fillers.AddRangeAsync(entities);
        }
    
     
    }
   
    public class ManufacturerFillRepository : Repository<Manufacturer_Fill>, IManufacturerFillRepository
    {
        private readonly SonnyDbContext _CONTEXT;
        public ManufacturerFillRepository(SonnyDbContext CONTEXT) : base(CONTEXT)
        {
            _CONTEXT = CONTEXT;
        }

        public async void AddRangeAsync(List<Manufacturer_Fill> entities)
        {
            await _CONTEXT.PD_Manufacturer_Fillers.AddRangeAsync(entities);
        }
    
     
    }
   
    public class SegmentFillRepository : Repository<Segment_Fill>, ISegmentFillRepository
    {
        private readonly SonnyDbContext _CONTEXT;
        public SegmentFillRepository(SonnyDbContext CONTEXT) : base(CONTEXT)
        {
            _CONTEXT = CONTEXT;
        }

        public async void AddRangeAsync(List<Segment_Fill> entities)
        {
            await _CONTEXT.PD_Segment_Fillers.AddRangeAsync(entities);
        }
    
     
    }
   
}