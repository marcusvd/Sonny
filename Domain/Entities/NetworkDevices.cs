using System.Collections.Generic;

namespace Domain.Entities
{
    public class NetworkDevices
    {
        public int Id { get; set; }
        public int ClientId {get; set;}
        public ClientEntity Client {get; set;}
        public List<ImgPath> Images { get; set; }
        public string Equipament { get; set; }
        public string Manufacturer { get; set; }
        public string Model { get; set; }
        public string User { get; set; }
        public string PhysicalLocation {get; set;}
        public string Password { get; set; }
        public string Sn { get; set; }
        public string Ip { get; set; }
        public string Mac { get; set; }
        public string Door { get; set; }
        public string Apps { get; set; }
        public string Connectivity { get; set; }
        public string Notes { get; set; }
        public string ToSeach { get; set; }
    }
}











