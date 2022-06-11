
namespace Domain.Entities
{
    public class Logistics
    {
        public int Id { get; set; }
        public Partner Partner { get; set; }
        public Address Source { get; set; }
        public Address Destination { get; set; }
        public string Start { get; set; }
        public string Finish { get; set; }
        public string ToSeach { get; set; }




    }
}