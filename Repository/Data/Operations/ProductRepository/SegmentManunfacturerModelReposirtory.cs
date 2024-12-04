
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


    }
    public class ManufacturerReposirtory : Repository<Manufacturer>, IManufacturerReposirtory
    {
        private readonly SonnyDbContext _CONTEXT;
        public ManufacturerReposirtory(SonnyDbContext CONTEXT) : base(CONTEXT)
        {
            _CONTEXT = CONTEXT;
        }


    }
    public class ModelReposirtory : Repository<Model>, IModelReposirtory
    {
        private readonly SonnyDbContext _CONTEXT;
        public ModelReposirtory(SonnyDbContext CONTEXT) : base(CONTEXT)
        {
            _CONTEXT = CONTEXT;
        }


    }
}