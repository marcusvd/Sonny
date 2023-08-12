using System;
using System.Collections.Generic;

namespace Domain.Entities.ServicesBench
{
    public enum StatusService
    {
        Testing = 0,
        HardwareWaiting = 1,
        InProcess = 2,
        TalkCustomer = 3,
        Assessing = 4
    }
}