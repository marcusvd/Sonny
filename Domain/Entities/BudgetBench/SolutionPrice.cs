using System;

namespace Domain.Entities.BudgetBench

{
    public class SolutionPrice
    {
        public int Id { get; set; }
        public DateTime DateService { get; set; }
        public string Technician { get; set; }
        public decimal PriceService { get; set; }
        public string ProblemByTechnician { get; set; }
        public string TechnicalSolution { get; set; }
        public bool Remote { get; set; }
        public bool Approved { get; set; }
        public int ServiceBudgetId { get; set; }
        public ServiceBudget ServiceBudget { get; set; }
    }
}
