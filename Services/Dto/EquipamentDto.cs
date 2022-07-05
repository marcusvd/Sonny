using System.Collections.Generic;

namespace  Services.Dto
{
    public class EquipamentDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public List<InventoryDto> Inventories {get; set;}
    }
}
