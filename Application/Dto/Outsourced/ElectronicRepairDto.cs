using System;

namespace Application.Dto.Outsourced
{
    public class ElectronicRepairDto
    {
        public int Id { get; set; }
        public string Item { get; set; }
        public DateTime EntryDate { get; set; }
        public string Description { get; set; }
        public string Problem { get; set; }
        public string User { get; set; }
        public string Password { get; set; }
        public Decimal Price { get; set; }
        public int CustomerId { get; set; }
        public CustomerDto Customer { get; set; }
        public int PartnerId { get; set; }
        public PartnerDto Partner { get; set; }
        public string solution { get; set; }
        public bool Authorized { get; set; }
        public string Finished { get; set; }

    }
}
