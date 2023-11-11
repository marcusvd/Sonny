
using Repository.Data.Operations.Repository;
using Domain.Entities.StkProduct;
using System.Collections.Generic;
using System.Threading.Tasks;
using Pagination.Models;
using Domain.Entities.Fill.StkProduct;

namespace Repository.Data.Operations.ProductRepository
{
    public interface IEquipamentFillRepository : IRepository<Equipament_Fill>
    {
        void AddRangeAsync(List<Equipament_Fill> entities);
    }
    public interface IManufacturerFillRepository : IRepository<Manufacturer_Fill>
    {
        void AddRangeAsync(List<Manufacturer_Fill> entities);
    }
    public interface ISegmentFillRepository : IRepository<Segment_Fill>
    {
        void AddRangeAsync(List<Segment_Fill> entities);
    }
}