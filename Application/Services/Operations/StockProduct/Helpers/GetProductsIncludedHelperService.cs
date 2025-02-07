using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Exceptions;
using Application.Services.Operations.StockProduct;
using Domain.Entities.StockProduct;
using Microsoft.EntityFrameworkCore;
using UnitOfWork.Persistence.Operations;

public class GetProductsIncludedHelperService
{
    public async Task<List<Product>> GetProductsIncluded(IUnitOfWork _GENERIC_REPO, int companyId)
    {
        var products = await _GENERIC_REPO.Products.Get(
            predicate: x => x.CompanyId == companyId && x.Deleted == DateTime.MinValue,
            toInclude => toInclude.Include(x => x.ProductType)
            .Include(x => x.Segment)
            .Include(x => x.Manufacturer)
            .Include(x => x.Supplier)
            .Include(x => x.ReservedForCustomer)
            .Include(x => x.User)
            .Include(x => x.IsReservedByUser)
            .Include(x => x.Model)
            .Include(x => x.Specificities),
            selector => selector).ToListAsync();

        return products;
    }

    public void ValidateEntity(List<ProductDto> entities)
    {
        if (entities == null)
            throw new Exception(GlobalErrorsMessagesException.ObjIsNull);
    }


    public List<ProductDto> GroupItemsByModelId(List<ProductDto> entities)
    {
        var toReturn = entities.GroupBy(model => new
        {
            model.ModelId,
        }).Select(group =>
        {
            var product = group.First();
            product.Quantity = group.Count();
            return product;

        }).ToList();

        return toReturn;
    }
}