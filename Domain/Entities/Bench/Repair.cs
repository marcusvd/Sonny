using System;
using System.Collections.Generic;
using Domain.Entities;
using Domain.Entities.ServicesBench.Enums;

namespace Domain.Entities.ServicesBench
{
    public class Repair
    {
        public int Id { get; set; }
        public string ServiceName { get; set; }
        public Decimal PriceService { get; set; }
        public int ServiceId { get; set; }
        public Service Service { get; set; }
        public DateTime Added { get; set; }
        public string ExecutedServicesComments { get; set; }
        public RepairStatusEnum RepairStatus { get; set; }
        public ExecutionModeEnum ExecutionMode { get; set; }

    }
}
