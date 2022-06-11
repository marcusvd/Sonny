using System;

namespace Domain.Entities
{
    public class Service
    {
        public int Id { get; set; }
        public ClientEntity Client  { get; set; }
        public DateTime Start { get; set; }
        public DateTime End { get; set; }
        // public Category Category { get; set; }
        public CheckList CheckList { get; set; }
        public string Historic { get; set; }

    }
}
