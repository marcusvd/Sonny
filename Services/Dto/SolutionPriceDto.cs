using System;

namespace Services.Dto

{
    public class SolutionPriceDto
    {
        public int Id { get; set; }
        public DateTime DateService { get; set; }
        public string Technician { get; set; }
        public decimal PriceService { get; set; }
        public string TechnicalSolution { get; set; }
        public bool Authorized { get; set; }
        public bool Remote { get; set; }
        public bool Solved { get; set; }
        public string Comment { get; set; }
        public int ServiceBudgetId { get; set; }
        public ServiceBudgetDto ServiceBudget { get; set; }
    }
}
