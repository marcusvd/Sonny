
namespace Application.Dto.ServiceBudgetBench

{
    public class BenchToCashBoxDto
    {
        public int Id { get; set; }
        public string Technician { get; set; }
        public decimal PriceService { get; set; }
        public string ProblemByTechnician { get; set; }
        public string TechnicalSolutionApplied { get; set; }
        // public string CantBeSolved { get; set; }
        public string Status { get; set; }
        public bool Solved { get; set; }
        // public bool Hardware { get; set; }
        public int ServiceBenchId { get; set; }
        public ServiceBenchDto ServiceBench { get; set; }
    }
}
