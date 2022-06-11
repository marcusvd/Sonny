using System;

namespace Services.Dto
{
    public class EletronicRepairDto
    {
        public int Id { get; set; }
        public string Item { get; set; }
        public DateTime day { get; set; }
        public string Problem { get; set; }
        public string User { get; set; }
        public string Password { get; set; }
        public int Price { get; set; }
        public int PartnerId { get; set; }
        public PartnerDto Partner { get; set; }
        public string solution { get; set; }
        public bool Authorized { get; set; }
        public string Finished { get; set; }

    }
}
