
using Application.Services.Operations.Main.Customers.Dtos;
using Application.Services.Operations.Main.Partners.Dtos;
using Application.Services.Shared.Dtos;

namespace Application.Services.Operations.Outsourced.Dtos
{
    public class DestinyDto : RootBaseDto
    {
       public int? CustomerId { get; set; }
        public CustomerDto Customer { get; set; }
        public int? PartnerId { get; set; }
        public PartnerDto Partner { get; set; }
        public string NoRegisterName { get; set; }
        public string NoRegisterAddress { get; set; }

    }
}
