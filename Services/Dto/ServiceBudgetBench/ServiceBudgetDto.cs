using System;
using System.Collections.Generic;

namespace Services.Dto.ServiceBudgetBench

{
    public class ServiceBudgetDto
    {
        public int Id { get; set; }
        public int CustomerId { get; set; }
        public CustomerDto Customer { get; set; }
        public DateTime BudgetStartedIn { get; set; }
        public string Visually { get; set; }
        public string RemoteAccessData { get; set; }
        public string ClientProblems { get; set; }
        public DateTime BenchStartedIn { get; set; }
        public string Status { get; set; }
        public bool Authorized { get; set; }
        public List<SolutionPriceDto> SolutionsPrices { get; set; }
    }
}
