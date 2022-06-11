using System;
//using Sonny.Domain.Entities.;
namespace Domain.Entities
{
    public class DevicesSold
    {
        public int Id { get; set; }
        
        public string Item { get; set; }
        public string DescriptiveItem { get; set; }
     //   public ClientyEntity clientyEntity { get; set; }
        
        public DateTime DayOfSale { get; set; }
        public int Warranty { get; set; }
        public DateTime WarrantyEnded {get; set;}
        public decimal Discount { get; set; }

    }
}
