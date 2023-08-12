using System;
using Domain.Entities;

namespace Application.Services.Operations.BenchBudgetService.Dtos
{
    public class PriceDto
    {
        public int Id { get; set; }
        public string ServiceName { get; set; }
        public Decimal PriceService { get; set; }
        public int ServiceId { get; set; }
        public ServiceDto Service { get; set; }

      //  public List<ServicesPrices> ServicesPrices { get; set; }
    }
}
