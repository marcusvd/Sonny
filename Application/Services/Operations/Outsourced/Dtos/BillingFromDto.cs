using Application.Services.Operations.Main.Customers.Dtos;
using Application.Services.Operations.Main.Partners.Dtos;
using Application.Services.Shared.Dtos;

namespace Application.Services.Operations.Outsourced.Dtos
{
    public class BillingFromDto : RootBaseDto
    {
        public int? PartnerId { get; set; }
        public PartnerDto Partner { get; set; }

        public int? CustomerId { get; set; }
        public CustomerDto Customer { get; set; }

        public bool Base { get; set; }
    }
}
