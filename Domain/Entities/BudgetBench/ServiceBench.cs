using System;
using System.Collections.Generic;

namespace Domain.Entities.BudgetBench
{
    public class ServiceBench
    {
        public int Id { get; set; }
        public int ClientId { get; set; }
        public ClientEntity Client { get; set; }
        public DateTime DateServiceStarted { get; set; }
        public bool Remote { get; set; }
        public string RemoteAccessData { get; set; }
        public string Visually { get; set; } // public string LocalAccessData { get; set; }
        public string Status { get; set; }
        public bool Finished { get; set; }
        public List<BenchToCashBox> ListBenchToCashBox { get; set; }
        
    }
}
