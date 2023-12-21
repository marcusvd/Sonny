using System;
using Domain.Entities.Authentication;
using Domain.Entities.Main;
using Domain.Entities.Main.Companies;
using Domain.Entities.Main.Customers;
using Domain.Entities.ServicesBench.Enums;

namespace Domain.Entities.ServicesBench
{
    public class BudgetService
    {
        public int Id { get; set; }
        public int CompanyId { get; set; }
        public Company Company { get; set; }
        public int UserId { get; set; }
        public MyUser User { get; set; }
        public int CustomerId { get; set; }
        public Customer Customer { get; set; }
        public string ProblemAccordingCustomer { get; set; }
        public string IsPresentVisuallyDescription { get; set; }
        public ExecutionModeEnum ExecutionMode { get; set; }
        public string DataDescription { get; set; }
        public DateTime EntryDate { get; set; }
        public Service Service { get; set; }
        public CollectDeliverCosts CollectsDeliversCosts { get; set; }
        public StatusServiceEnum StatusService { get; set; }
    }
}
