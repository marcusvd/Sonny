
using System.Collections.Generic;
using Domain.Entities.StockProduct;
using Domain.Entities.StockProduct.ProductKind;
using Repository.Data.Context;
using Repository.Data.Operations.Repository;

namespace Repository.Data.Operations.ProductRepository
{
    public class SegmentReposirtory : Repository<Segment>, ISegmentReposirtory
    {
        private readonly SonnyDbContext _CONTEXT;
        public SegmentReposirtory(SonnyDbContext CONTEXT) : base(CONTEXT)
        {
            _CONTEXT = CONTEXT;
        }
        public void UpdateRange(List<Segment> entities)
        {
            _CONTEXT.PD_Segments.UpdateRange(entities);
        }

    }
    public class ManufacturerReposirtory : Repository<Manufacturer>, IManufacturerReposirtory
    {
        private readonly SonnyDbContext _CONTEXT;
        public ManufacturerReposirtory(SonnyDbContext CONTEXT) : base(CONTEXT)
        {
            _CONTEXT = CONTEXT;
        }
        public void UpdateRange(List<Manufacturer> entities)
        {
            _CONTEXT.PD_Manufacturers.UpdateRange(entities);
        }

    }
    public class ModelReposirtory : Repository<Model>, IModelReposirtory
    {
        private readonly SonnyDbContext _CONTEXT;
        public ModelReposirtory(SonnyDbContext CONTEXT) : base(CONTEXT)
        {
            _CONTEXT = CONTEXT;
        }

        public void UpdateRange(List<Model> entities)
        {
            _CONTEXT.PD_Models.UpdateRange(entities);
        }
    }
}