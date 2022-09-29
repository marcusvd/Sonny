using System;

namespace Services.Dto.ServiceBudgetBench

{
    public class SolutionPriceDto
    {
        public int Id { get; set; }
        public DateTime DateService { get; set; }
        public string Technician { get; set; }
        public decimal PriceService { get; set; }
        public string ProblemByTechnician { get; set; }
        public string TechnicalSolution { get; set; }
        public bool Remote { get; set; }
        public bool Authorized { get; set; }
        public int ServiceBudgetId { get; set; }
        public ServiceBudgetDto ServiceBudget { get; set; }
    }
}
