using System.Collections.Generic;
using Services.Dto.Financial;

namespace Services.Dto
{
    public class SupplierDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Seller { get; set; }
        public string Description { get; set; }
        public string Operation { get; set; }
        public int AddressId { get; set; }
        public AddressDto Address { get; set; }
        public int ContactId { get; set; }
        public ContactDto Contact { get; set; }
        public List<TypePaymentDto> typespayments { get; set; }
        public string ToSeach { get; set; }
    }
}