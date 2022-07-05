using System.Collections.Generic;

namespace Domain.Entities
{
    public class Equipament
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public List<Inventory> Inventories {get; set;}
    }
}
