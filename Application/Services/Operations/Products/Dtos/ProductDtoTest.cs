using System.Collections.Generic;
using Domain.Entities.Product;

namespace Application.Services.Operations.Products.Dtos
{
    public class ProductGroupedToDtoView
    {
        public string EquipamentName { get; set; }
        public List<Product> Products { get; set; }
    }
}