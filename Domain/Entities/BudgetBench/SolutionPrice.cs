using System;

namespace Domain.Entities.BudgetBench

{
    public class SolutionPrice
    {
        public int Id { get; set; }
        public DateTime DateService { get; set; }
        public string Technician { get; set; }
        public decimal PriceService { get; set; }
        public string TechnicalSolution { get; set; }
        public bool Authorized { get; set; }
        public bool Solved { get; set; }
        public bool Remote { get; set; }
        public string Comment { get; set; }
        public int ServiceBudgetId {get; set;}
        public ServiceBudget ServiceBudget {get; set;}
        public int ServiceBenchId {get; set;}
        public ServiceBench ServiceBench {get; set;}
    }
}
