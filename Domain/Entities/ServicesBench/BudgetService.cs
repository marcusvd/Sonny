using System;
using System.Collections.Generic;
using Domain.Entities;

namespace Domain.Entities.ServicesBench
{
    public class BudgetService
    {
        public int Id { get; set; }
        public int CompanyId { get; set; }
        public Company Company { get; set; }
        public int CustomerId { get; set; }
        public Customer Customer { get; set; }
        public string ProblemAccordingCustomer { get; set; }
        public string ProblemAccordingTechnician { get; set; }
        public string ServicesNeededToFix { get; set; }
        public DateTime IsAuthorized { get; set; }
        public string IsPresentVisuallyDescription { get; set; }
        public bool IsRemote { get; set; }
        public string DataDescription { get; set; }
        public DateTime EntryDate { get; set; }
        public Service Service { get; set; }
        public List<ServicesPrices> ServicesPrices { get; set; }
        public StatusService StatusService { get; set; }
    }
}
