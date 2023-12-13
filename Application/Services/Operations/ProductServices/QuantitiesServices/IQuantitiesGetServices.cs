using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using Application.Services.Operations.ProductServices.Dtos;
using Pagination.Models;

namespace Application.Services.Operations.ProductServices.QuantitiesServices
{
    public interface IQuantitiesGetServices
    {
      Task<Page<QuantityDto>> GetAllQuantitiesByProductId(Params parameters);
      Task<int> LengthQuantitiesAsync(int productId);
    }
}