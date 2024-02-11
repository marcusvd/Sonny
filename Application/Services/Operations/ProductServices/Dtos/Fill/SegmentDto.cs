using System;
using System.Collections.Generic;
using Domain.Entities.Main.Companies;

namespace Application.Services.Operations.ProductServices.Dtos.Fill
{
    public class SegmentDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int ItemId { get; set; }
        public ItemDto Item { get; set; }
    }
}