using System;
using System.Collections.Generic;

namespace Domain.Entities.BudgetBench
{
    public class ServiceBench
    {
        public int Id { get; set; }
        public int ClientId { get; set; }
        public ClientEntity Client { get; set; }
        public string ClientNoRegister { get; set; }
        public string ClientProblems { get; set; }
        public string Visually { get; set; }
        public string Status { get; set; }
        public string User { get; set; }
        public DateTime BenchStartedIn { get; set; }
        public bool Finished { get; set; }

    }
}
