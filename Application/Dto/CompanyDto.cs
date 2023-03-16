using Application.Dto.Shared;

namespace Application.Dto
{
    public class CompanyDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int AddressId { get; set; }
        public AddressDto Address { get; set; }
        public int ContactId { get; set; }
        public ContactDto Contact { get; set; }
    }


}
