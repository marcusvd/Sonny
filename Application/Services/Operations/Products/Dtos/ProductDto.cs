using System.Collections.Generic;
using Application.Dto;

namespace Application.Services.Operations.Products.Dtos
{
    public class ProductDto
    {
        public int Id { get; set; }
        public int StockId { get; set; }
        public StockDto Stock { get; set; }
        public int NameId { get; set; }
        public EquipamentTypeDto Name { get; set; }
        public int ManufacturerId { get; set; }
        public ManufacturerDto Manufacturer { get; set; }
        public int SupplierId { get; set; }
        public PartnerDto Supplier { get; set; }
        public string Model { get; set; }
        public StatusEnumDto Status { get; set; }
        public int QuantityReserved { get; set; }
        public int AvailableQuantity { get; set; }
        public List<QuantityDto> Quantities { get; set; }
        public List<TrackingDto> Trackings { get; set; }
        public string NormalizedName { get; set; }
        public string Description { get; set; }
    }
}