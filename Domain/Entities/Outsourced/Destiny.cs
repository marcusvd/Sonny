using System;
using System.Collections.Generic;

namespace Domain.Entities.Outsourced
{
    public class Destiny
    {
        public int Id { get; set; }
        public int? CustomerId { get; set; }
        public Customer Customer { get; set; }
        public int? PartnerId { get; set; }
        public Partner Partner { get; set; }
        public string NoRegisterName { get; set; }
        public string NoRegisterAddress { get; set; }
        public Decimal Price { get; set; }
        public bool Collect { get; set; }
        public bool Deliver { get; set; }
        public string Description { get; set; }
        public int CollectDeliverId { get; set; }
        public CollectDeliver CollectDeliver { get; set; }


    }
}