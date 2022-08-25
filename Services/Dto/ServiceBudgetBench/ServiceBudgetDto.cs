using System;
using System.Collections.Generic;

namespace Services.Dto.ServiceBudgetBench

{
    public class ServiceBudgetDto
    {
               public int Id { get; set; }
        public int ClientId { get; set; }
        public ClientDto Client { get; set; }
        public string ClientNoRegister { get; set; }
        public string ClientProblems { get; set; }
        public string Visually { get; set; }
        public string Status { get; set; }
        public string User { get; set; }
        public DateTime BudgetStartedIn { get; set; }
        public DateTime BenchStartedIn { get; set; }
        public bool Finished { get; set; }
        public List<SolutionPriceDto> SolutionsPrices { get; set; }

    }
}
