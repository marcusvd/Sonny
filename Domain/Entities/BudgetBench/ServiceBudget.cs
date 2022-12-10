using System;
using System.Collections.Generic;

namespace Domain.Entities.BudgetBench
{
    public class ServiceBudget
    {
        public int Id { get; set; }
        public int CustomerId { get; set; }
        public Customer Customer { get; set; }
        public DateTime BudgetStartedIn { get; set; }
        public string Visually { get; set; }
        public string RemoteAccessData { get; set; }
        public string CustomerProblems { get; set; }
        public DateTime BenchStartedIn { get; set; }
        public string Status { get; set; }
        public bool Authorized { get; set; }
        public List<SolutionPrice> SolutionsPrices { get; set; }
    }
}
