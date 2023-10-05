using System;
using Application.Services.Operations.Main.Companies.Dtos;
using Application.Services.Operations.Main.Customers.Dtos;
using Domain.Entities.Authentication;
using Application.Services.Operations.BenchBudgetService.Dtos.Enums;
using Application.Services.Operations.Authentication.Dtos;

namespace Application.Services.Operations.BenchBudgetService.Dtos
{
    public class BudgetServiceDto
    {
        public int Id { get; set; }
        public int CompanyId { get; set; }
        public CompanyDto Company { get; set; }
        public int UserId { get; set; }
        public MyUserDto User { get; set; }
        public int CustomerId { get; set; }
        public CustomerDto Customer { get; set; }
        public string ProblemAccordingCustomer { get; set; }
        public string IsPresentVisuallyDescription { get; set; }
        public bool IsRemote { get; set; }
        public string DataDescription { get; set; }
        public DateTime EntryDate { get; set; }
        // public DateTime BudgetOpen { get; set; }
        public ServiceDto Service { get; set; }
        public CollectDeliverCostsDto CollectsDeliversCosts { get; set; }
        public StatusServiceEnumDto StatusService { get; set; }
    }
}
