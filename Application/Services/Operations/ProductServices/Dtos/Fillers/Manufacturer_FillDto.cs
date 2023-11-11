using System;
using System.Collections.Generic;
using Application.Services.Operations.Main.Companies.Dtos;

namespace Application.Services.Operations.ProductServices.Dtos.Fill
{
    public class Manufacturer_FillDto
    {
        public int Id { get; set; }
        public string Manufacturer { get; set; }
        public int CompanyId { get; set; }
        public CompanyDto Company { get; set; }
    }
}