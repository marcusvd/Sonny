using System;
using System.Collections.Generic;
using Domain.Entities.BudgetBench;

namespace Domain.Entities.Financial
{
    public class BusinessBox
    {
        public int Id { get; set; }
        public DateTime Today { get; set; }
        public Inventory DeviceSold { get; set; }
        public ServiceBench ExectedService { get; set; }
    }
}