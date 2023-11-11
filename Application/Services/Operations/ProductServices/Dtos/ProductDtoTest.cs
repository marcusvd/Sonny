using System.Collections.Generic;
using Domain.Entities.StkProduct;

namespace Application.Services.Operations.ProductServices.Dtos
{
    public class ProductGroupedToDtoView
    {
        public string EquipamentName { get; set; }
        public List<Product> Products { get; set; }
    }
}