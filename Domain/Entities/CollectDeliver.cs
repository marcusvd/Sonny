using System;

namespace Domain.Entities
{
    public class CollectDeliver
    {
        public int Id { get; set; }
        public string TypeOfService { get; set; }
        public string Transporter { get; set; }
        public string Noregisterd { get; set; }
        public DateTime Start { get; set; }
        public int Price { get; set; }
        public int ClientId { get; set; }
        public int PartnerId { get; set; }
        public string NoRegisterName { get; set; }
        public string NoRegisterAddress { get; set; }
        public string Items { get; set; }
        public string Comments { get; set; }

    }
}
