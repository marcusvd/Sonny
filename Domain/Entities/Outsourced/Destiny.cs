using Domain.Entities.Main;
using Domain.Entities.Main.Customers;
using Domain.Entities.Shared;

namespace Domain.Entities.Outsourced
{
    public class Destiny : RootBase
    {
        public int? CustomerId { get; set; }
        public Customer Customer { get; set; }
        public int? PartnerId { get; set; }
        public Partner Partner { get; set; }
        public string NoRegisterName { get; set; }
        public string NoRegisterAddress { get; set; }
        // public string Description { get; set; }
        // public int CollectDeliverId { get; set; }
        // public CollectDeliver CollectDeliver { get; set; }

    }
}