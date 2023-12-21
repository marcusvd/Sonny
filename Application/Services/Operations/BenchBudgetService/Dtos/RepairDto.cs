using System;
using System.Collections.Generic;
using Application.Services.Operations.BenchBudgetService.Dtos.Enums;
using Domain.Entities;

namespace Application.Services.Operations.BenchBudgetService.Dtos
{
    public class RepairDto
    {
        public int Id { get; set; }
        public string ServiceName { get; set; }
        public Decimal PriceService { get; set; }
        public int ServiceId { get; set; }
        public ServiceDto Service { get; set; }
        public RepairStatusEnumDto RepairStatus { get; set; }
        public DateTime Added { get; set; }
        public ExecutionModeEnumDto ExecutionMode { get; set; }
        public string ExecutedServicesComments { get; set; }

    }
}
