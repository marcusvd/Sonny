using Application.Services.Shared.Dtos;
namespace Application.Services.Operations.StockProduct.ProductKind.Add
{
    public class ModelAddDto: RootBaseDto
    {
        public string Name { get; set; }
        public string Description { get; set; }

    }
}