using System;

namespace Domain.Entities.BudgetBench

{
    public class BenchToCashBox
    {
        public int Id { get; set; }
        public string Technician { get; set; }
        public decimal PriceService { get; set; }
        public string ProblemByTechnician { get; set; }
        public string TechnicalSolutionApplied { get; set; }
        public string CantBeSolved { get; set; }
        public string Status { get; set; }
        public bool Solved { get; set; }
        public bool Hardware { get; set; }
        public int ServiceBenchId { get; set; }
        public ServiceBench ServiceBench { get; set; }
    }
}
