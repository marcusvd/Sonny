
namespace Domain.Entities.Shared
{
    public class Address
    {
        public Address()
        { }
        public Address(string zipCode, string street, string number, string district, string city,
                        string state, string complement
        )
        {           
             ZipCode = zipCode;
             Street = street;
             Number = number;
             District = district;
             City = city;
             State = state;
             Complement = complement;
        }
        public int Id { get; set; }
        public string ZipCode { get; set; }
        public string Street { get; set; }
        public string Number { get; set; }
        public string District { get; set; }
        public string City { get; set; }
        public string State { get; set; }
        public bool Deleted { get; set; }
        public string Complement { get; set; }
    }

}