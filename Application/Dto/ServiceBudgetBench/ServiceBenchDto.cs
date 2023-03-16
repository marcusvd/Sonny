using System;
using System.Collections.Generic;

namespace Application.Dto.ServiceBudgetBench
{
    public class ServiceBenchDto
    {
        public int Id { get; set; }
        public int CustomerId { get; set; }
        public CustomerDto Customer { get; set; }
        public DateTime DateServiceStarted { get; set; }
        public DateTime DateServiceFinished { get; set; }
        public bool Remote { get; set; }
        public string RemoteAccessData { get; set; }
        public string Visually { get; set; } // public string LocalAccessData { get; set; }
        public string Status { get; set; }
        public bool Finished { get; set; }
        public List<BenchToCashBoxDto> ListBenchToCashBox { get; set; }
    }
}
