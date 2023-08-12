using System;
using Domain.Entities.Authentication;
using Domain.Entities.Main;
using Domain.Entities.Main.Companies;
using Domain.Entities.Main.Customers;


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
        public bool IsRemote { get; set; }
        public string DataDescription { get; set; }
        public DateTime EntryDate { get; set; }
        public Service Service { get; set; }
        public StatusService StatusService { get; set; }

    }
}
