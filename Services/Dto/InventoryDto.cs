using System;
namespace Services.Dto
{
    public class InventoryDto
    {
        public int Id { get; set; }
        public int EquipamentId { get; set; }
        public EquipamentDto Equipament { get; set; }
        public decimal Cost { get; set; }
        public decimal Saleprice { get; set; }
        public bool Isnew { get; set; }
        public bool Istested { get; set; }
        public int Quantity { get; set; }
        public int PartnerId { get; set; }
        public PartnerDto Partner { get; set; }
        public int Warranty { get; set; }
        public DateTime Today { get; set; }
        public string Sn { get; set; }
        public string Driver { get; set; }
        public string Manufactorer { get; set; }
        public string Model { get; set; }
        public string Generation { get; set; }
        public string Capacity { get; set; }
        public string Speed { get; set; }
        public string Comment { get; set; }
        public string Historical { get; set; }
        //The real day that record was inserted into database.
        public DateTime Today_ { get; set; }
        //   public DateTime endOfWarranty { get; set; }
        public string ToSeach { get; set; }
    }
}