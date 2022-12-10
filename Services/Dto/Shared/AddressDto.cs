namespace Services.Dto.Shared
{
    public class AddressDto
    {
        public int Id { get; set; }
        public string zipcode { get; set; }
        public string Street { get; set; }
        public string Number { get; set; }
        public string District { get; set; }
        public string City { get; set; }
        public string State { get; set; }
        public string Complement { get; set; }
    }
}