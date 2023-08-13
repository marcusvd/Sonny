using System;
using System.Collections.Generic;
using Domain.Entities.Authentication;

namespace Application.Services.Operations.BenchBudgetService.Dtos
{
    public class ServiceDto
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public MyUser User { get; set; }
        public string ExecutedServicesComments { get; set; }
        public DateTime IsAuthorized { get; set; }
        public DateTime Start { get; set; }
        public DateTime Finished { get; set; }
        public Decimal AmountPrice { get; set; }
        public Decimal CollectDeliveredPrice { get; set; }
        public List<PriceDto> Prices { get; set; }
    }
}
