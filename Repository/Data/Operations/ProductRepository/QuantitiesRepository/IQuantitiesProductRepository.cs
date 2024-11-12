using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

using Pagination.Models;
using Repository.Data.Operations.Repository;

// namespace Repository.Data.Operations.ProductRepository.QuantitiesRepository
// {
//     public interface IQuantitiesProductRepository : IRepository<Quantity>
//     {
//          Task<List<Quantity>> GetMultplesById(List<int> ids);
//          void UpdateRange(List<Quantity> entities);
//         Task<Page<Quantity>> GetPaged(Params parameters, Expression<Func<Quantity, Quantity>> selector = null, Func<IQueryable<Quantity>, IOrderedQueryable<Quantity>> orderBy = null);
//     }
// }