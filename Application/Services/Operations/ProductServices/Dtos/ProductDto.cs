using System.Collections.Generic;
using Application.Services.Operations.Main.Companies.Dtos;
using Application.Services.Operations.Main.Partners.Dtos;

namespace Application.Services.Operations.ProductServices.Dtos
{
    public class ProductDto
    {
        public int Id { get; set; }
        public int CompanyId { get; set; }
        public CompanyDto Company { get; set; }
        public EquipamentDto Equipament { get; set; }
        public List<QuantityDto> Quantities { get; set; }
        public List<TrackingDto> Trackings { get; set; }

    }
}

