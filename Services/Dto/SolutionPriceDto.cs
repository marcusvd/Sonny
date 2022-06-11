using System;

namespace Services.Dto

{
    public class SolutionPriceDto
    {
        public int Id { get; set; }
        public DateTime DateService { get; set; }
        public string Technician { get; set; }
        public decimal PriceService { get; set; }
        public string Technicalsolution { get; set; }
        public bool Authorized { get; set; }
        public bool Remote { get; set; }
    }
}
