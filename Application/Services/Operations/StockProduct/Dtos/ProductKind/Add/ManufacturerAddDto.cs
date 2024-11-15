using Application.Services.Shared.Dtos;

namespace Application.Services.Operations.StockProduct.ProductKind.Add
{
    public class ManufacturerAddDto: RootBaseDto
    {
        public string Name { get; set; }
        public ModelAddDto Model { get; set; }

    }
}