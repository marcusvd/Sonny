using System.Collections.Generic;
using Application.Services.Shared.Dtos;

namespace Application.Services.Operations.StockProduct.ProductKind
{

    public class EditChildrenProductType 
    {
        public int ProductTypeId { get; set; }
        public string ProductTypeName { get; set; }
        // public int SegmentId { get; set; }
        public string SegmentName { get; set; }
        // public int ManufacturerId { get; set; }
        public string ManufacturerName { get; set; }
        public string ModelName { get; set; }
        public string SpecificitiesName { get; set; }


    }
}