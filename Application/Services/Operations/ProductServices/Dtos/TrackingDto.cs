using System;
using Application.Services.Operations.Authentication.Dtos;
using Application.Services.Operations.BenchBudgetService.Dtos;
using Application.Services.Operations.Main.Customers.Dtos;

namespace Application.Services.Operations.ProductServices.Dtos
{
    public class TrackingDto
    {
        public int Id { get; set; }
        public decimal CostPrice { get; set; }
        public decimal SoldPrice { get; set; }
        public string Sn { get; set; }
        public string NfNumber { get; set; }
        // public bool IncludedService { get; set; }

        public int ServiceId { get; set; }
        public BudgetServiceDto Service { get; set; }
        public int ProductId { get; set; }
        public ProductDto Product { get; set; }
        public int? CustomerId { get; set; }
        public CustomerDto Customer { get; set; }
        public int UserId { get; set; }
        public MyUserDto User { get; set; }

    }
}